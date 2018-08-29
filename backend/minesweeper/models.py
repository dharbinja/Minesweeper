import math
from enum import Enum
from datetime import datetime
from random import sample

from django.db import models
from django.utils import timezone

class Difficulty(models.Model):
    name = models.CharField(max_length=20, null=True)
    rows = models.IntegerField(default=0)
    columns = models.IntegerField(default=0)
    num_mines = models.IntegerField(default=0)

    def __str__(self):
        """String representation of a game difficulty"""
        return self.name


class Game(models.Model):
    time_started = models.DateTimeField(default=datetime.now)
    time_ended = models.DateTimeField(null=True, blank=True)
    difficulty = models.ForeignKey(Difficulty, on_delete=models.PROTECT, null=True)
    result = models.CharField(max_length=20, default='')

    def __str__(self):
        """String representation of the Game model."""
        return "Game" 

    def build_game_tiles(self):
        """
        Builds the minesweeper "map" by randomly placing mines on the board
        and creating a set of tiles with surrounding information.
        """
        cols = self.difficulty.columns
        rows = self.difficulty.rows
        num_tiles = rows * cols
        num_mines = self.difficulty.num_mines

        # We generate a bunch of mine positions here based on index
        mine_positions = list(sample(range(num_tiles), num_mines))

        # initialize a 2d array (matrix) that will represent all 0s 
        # for the number of neighbouring mines. Indexes that are actually
        # mines will be set as -1 
        mine_matrix = [0] * rows
        for i in range(rows):
            mine_matrix[i] = [0] * cols

        # Now for each mine we'll go through and update the neighbours
        # accordingly
        for i in mine_positions:
            mine_row = math.floor(i / cols)
            mine_column = i % cols
            # since we're looping through mine positions, this one is a mine
            mine_matrix[mine_row][mine_column] = -1

            # now update the neighbours
            for x in range(-1, 2):
                for y in range(-1, 2):
                    neighbour_row = mine_row + x
                    neighbour_col = mine_column + y

                    # Since python wraps around if you pass in negative values
                    # to lists, we want to prevent that here
                    if neighbour_row > rows - 1 or neighbour_row < 0 or neighbour_col > cols - 1 or neighbour_col < 0:
                        continue  

                    # If it isn't a mine, increment the number of mines around this tile
                    if mine_matrix[neighbour_row][neighbour_col] != -1:
                        mine_matrix[neighbour_row][neighbour_col] += 1

        # We'll create a list of tiles we want to create here, so that we can do a bulk create later
        # it should be significantly faster
        tile_dictionary = []
        for i in range(rows):
            for j in range(cols):
                tile = {
                    "game": self,
                    "is_mine": mine_matrix[i][j]==-1, 
                    "neighbouring_mines": mine_matrix[i][j],
                    "row": i,
                    "column": j,
                }
                tile_dictionary.append(tile)

        # Do a bulk create
        Tile.objects.bulk_create([Tile(**tile) for tile in tile_dictionary])

    def get_all_neighbours_to_be_opened(self, tile, id_list):
        """
        Recursive function that will iterate and open all neighbours of tiles that
        have zero mines around them.
        """
        # Loop over all the neighbours and see if they need to be opened as well
        for x in range(-1, 2):
            for y in range(-1, 2):
                neighbour_row = tile.row + x
                neighbour_col = tile.column + y

                # Not interested in ourselves either
                if neighbour_col == tile.column and neighbour_row == tile.row:
                    continue

                # Since python wraps around if you pass in negative values
                # to lists, we want to prevent that here
                if neighbour_row > self.difficulty.rows - 1 or neighbour_row < 0 or neighbour_col > self.difficulty.columns - 1 or neighbour_col < 0:
                    continue

                # Now we need to find the tile
                neighbour_tile = self.tile_set.all().get(row=neighbour_row, column=neighbour_col)
                if (neighbour_tile.status == 'Closed' and neighbour_tile.id not in id_list):
                    # Add it to the list of Ids, we'll bulk update later
                    id_list.append(neighbour_tile.id)

                    # Make a recursive call to open up all the neighbours of this tile if necessary
                    if not neighbour_tile.is_mine and neighbour_tile.neighbouring_mines == 0:
                        self.get_all_neighbours_to_be_opened(neighbour_tile, id_list)


    def open_neighbours(self, tile):
        """
        This function will open all the neighbours of a tile if they are already unopened. This
        function is mostly useful when you click on a tile that has no mines around it.
        """
        print('checking neighbours')
        neighbour_ids = []
        self.get_all_neighbours_to_be_opened(tile, neighbour_ids)
        #print(neighbour_ids)
        Tile.objects.filter(pk__in=neighbour_ids).update(status='Opened')            

    def game_lost(self):
        """
        We've lost the game by "stepping" on a mine, so we'll set the result and the time ended
        """
        self.time_ended = timezone.now()
        self.result = 'Loss'
        self.save()

        # We'll open all the unexploded mines to show the user where they were
        uncleared_mines = self.tile_set.all().filter(status='Closed', is_mine=True).update(status='Opened')

    def check_win_scenarios(self):
        """
        Checks if we have won the game. We win if we have opened all non-mine tiles
        """

        # We have won the game if we've opened all non-mine tiles
        num_non_mine_tiles = (self.difficulty.rows * self.difficulty.columns) - self.difficulty.num_mines
        opened_non_mine_tiles = self.tile_set.all().filter(status='Opened', is_mine=False)

        if num_non_mine_tiles == opened_non_mine_tiles.count():
            self.time_ended = timezone.now()
            self.result = 'Win'
            self.save()


    # We'll have the games sorted by time started so that the first one will always be the
    # "current game". That way when retrieving games it'll make it easier for us to get the
    # one started last
    class Meta:
        ordering = ['-time_started']



class Tile(models.Model):
    TILE_STATUS = (
        ('Closed', 'Closed'),
        ('Opened', 'Opened'),
        ('Flagged', 'Flagged'),
    )

    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    status = models.CharField(max_length=7, choices=TILE_STATUS, default=TILE_STATUS[0][0])
    row = models.IntegerField(default=0)
    column = models.IntegerField(default=0)
    is_mine = models.BooleanField()
    neighbouring_mines = models.IntegerField()

    def __str__(self):
        """String representation of the Tile model."""
        return "Tile"

    class Meta:
        ordering = ['row', 'column']

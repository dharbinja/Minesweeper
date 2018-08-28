import math
from enum import Enum
from datetime import datetime
from random import sample

from django.db import models

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
    difficulty = models.OneToOneField(Difficulty, on_delete=models.PROTECT, null=True)

    def __str__(self):
        """String representation of the Game model."""
        return "Game" 

    def build_game_tiles(self):
        """Builds the minesweeper "map" by creating a set of tiles"""
        cols = self.difficulty.rows
        rows = self.difficulty.columns
        num_tiles = rows * cols
        num_mines = self.difficulty.num_mines

        # We generate a bunch of mine positions here based on index
        mine_positions = list(sample(range(num_tiles), num_mines))

        print(mine_positions)

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

            #print('Mine at ' + str(mine_row) + ', ' + str(mine_column) + ': ')

            # now update the neighbours
            for x in range(-1, 2):
                for y in range(-1, 2):
                    neighbour_row = mine_row + x
                    neighbour_col = mine_column + y

                    # Since python wraps around if you pass in negative values
                    # to lists, we want to prevent that here
                    if neighbour_row > rows - 1 or neighbour_row < 0 or neighbour_col > cols - 1 or neighbour_col < 0:
                        #print('No neighobur at ' + str(neighbour_row) + ', ' + str(neighbour_col))
                        continue  

                    # If it isn't a mine, increment the number of mines around this tile
                    if mine_matrix[neighbour_row][neighbour_col] != -1:
                        #print('Incrementing neighbour at ' + str(neighbour_row) + ', ' + str(neighbour_col))
                        mine_matrix[neighbour_row][neighbour_col] += 1


        #for i in range(rows):
        #    print(mine_matrix[i])

        for i in range(rows):
            for j in range(cols):
                tile = Tile.objects.create(
                    game=self, 
                    is_mine=mine_matrix[i][j]==-1, 
                    neighbouring_mines=mine_matrix[i][j],
                    row=i,
                    column=j,
                )
                tile.save()



class Tile(models.Model):
    TILE_STATUS = (
        ('Closed', 'Closed'),
        ('Opened', 'Opened'),
        ('Flagged', 'Flagged'),
    )

    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    status = models.CharField(max_length=7, choices=TILE_STATUS)
    row = models.IntegerField(default=0)
    column = models.IntegerField(default=0)
    is_mine = models.BooleanField()
    neighbouring_mines = models.IntegerField()

    def __str__(self):
        """String representation of the Tile model."""
        return "Tile"

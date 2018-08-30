from django.test import TestCase
from .test_helper import create_difficulty, create_game

from minesweeper.models import Tile

class TileModelTests(TestCase):

    def test_can_create_tile_from_only_game(self):
        """
        We'll test that you can create a tile with just a game
        """
        difficulty = create_difficulty(name='A difficulty', cols=10, rows=10)
        game = create_game(difficulty=difficulty)
        tile = Tile.objects.create(game=game)
        self.assertEqual(tile.status, 'Closed')
        self.assertEqual(tile.row, 0)
        self.assertEqual(tile.column, 0)
        self.assertFalse(tile.is_mine)
        self.assertFalse(tile.is_exploded_mine)
        self.assertFalse(tile.wrongly_flagged)
        self.assertEqual(tile.neighbouring_mines, 0)
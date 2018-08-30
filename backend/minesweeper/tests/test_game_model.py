from django.test import TestCase
from .test_helper import create_difficulty

from minesweeper.models import Game


class GameModelTests(TestCase):

    def test_can_create_a_game_from_only_difficulty(self):
        """
        We'll test that all you need to create a game is a difficulty
        """
        difficulty = create_difficulty(name='A difficulty', cols=10, rows=10)
        game = Game.objects.create(difficulty=difficulty)
        self.assertIs(game.result, '')
        self.assertIsNone(game.time_ended)
        self.assertIsNotNone(game.time_started)

    def test_cannot_create_game_without_difficulty(self):
        """
        Test to make sure we need a difficulty to create a game
        """
        self.assertRaises(Exception, Game.objects.create)

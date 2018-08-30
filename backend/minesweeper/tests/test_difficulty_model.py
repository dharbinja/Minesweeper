from django.test import TestCase
from .test_helper import create_difficulty

from minesweeper.models import Difficulty

class DifficultyModelTests(TestCase):

    def test_can_create_difficulty_with_defaults(self):
        """
        We'll test that you can create a difficulty with just defaults
        """
        difficulty = Difficulty.objects.create()
        self.assertIsNone(difficulty.name)
        self.assertEqual(difficulty.columns, 1)
        self.assertEqual(difficulty.rows, 1)
        self.assertEqual(difficulty.num_mines, 1)
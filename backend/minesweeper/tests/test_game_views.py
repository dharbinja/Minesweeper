from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient

from .test_helper import create_game, create_difficulty

class GameAPITests(APITestCase):

    def test_get_all_games(self):
        """
        Ensure we can make a call to get all games
        """
        difficulty = create_difficulty(name='New', cols=1, rows=1)
        game = create_game(difficulty=difficulty)

        # Make the API call
        client = APIClient()
        response = client.get('/api/v1/game/')
        self.assertEquals(response.status_code, 200)

    def test_should_allow_us_to_update_a game(self):
        """
        We should be able to update the state of the game
        """
        difficulty = create_difficulty(name='New', cols=1, rows=1)
        game = create_game(difficulty=difficulty)

        client = APIClient()
        response = client.put('/api/v1/game/1')
        self.assertEquals(response.status_code, 200)

    def test_should_allow_us_to_create_a_game(self):
        """
        We can also create games
        """
        client = APIClient()
        response = client.post('/api/v1/game/')
        self.assertEquals(response.status_code, 200)

    def test_no_other_routes_available(self):
        """
        Delete routes should not be available on the game
        """
        difficulty = create_difficulty(name='New', cols=5, rows=5)
        game = create_game(difficulty=difficulty)

        client = APIClient()
        response = client.delete('/api/v1/game/')
        self.assertEquals(response.status_code, 405)

        client = APIClient()
        response = client.delete('/api/v1/game/1')
        self.assertEquals(response.status_code, 301)
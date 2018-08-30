from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient

from .test_helper import create_tile, create_game, create_difficulty


class TileAPITests(APITestCase):

    def test_get_all_tiles(self):
        """
        Ensure we can make a call to get all tiles
        """
        difficulty = create_difficulty(name='New', cols=1, rows=1)
        game = create_game(difficulty=difficulty)

        # Make the API call
        client = APIClient()
        response = client.get('/api/v1/tile/')
        self.assertEquals(response.status_code, 200)
        self.assertEquals(len(response.json()), 1)

    def test_should_allow_us_to_update_tiles(self):
        """
        Updating tiles is how we update the state of the game
        """
        difficulty = create_difficulty(name='New', cols=1, rows=1)
        game = create_game(difficulty=difficulty)

        client = APIClient()
        response = client.put('/api/v1/tile/1')
        self.assertEquals(response.status_code, 301)

    def test_should_not_allow_us_to_create_tiles(self):
        """
        We only allow get tiles at this time, we cannot create them. They
        should only be managed by the game
        """
        client = APIClient()
        response = client.post('/api/v1/tile/')
        self.assertEquals(response.status_code, 405)

    def test_no_other_routes_available(self):
        """
        We only allow get and create tile at this time, 
        all other routes should return errors
        """
        difficulty = create_difficulty(name='New', cols=5, rows=5)
        game = create_game(difficulty=difficulty)

        client = APIClient()
        response = client.put('/api/v1/tile/')
        self.assertEquals(response.status_code, 405)

        client = APIClient()
        response = client.delete('/api/v1/tile/')
        self.assertEquals(response.status_code, 405)

        client = APIClient()
        response = client.delete('/api/v1/tile/1')
        self.assertEquals(response.status_code, 301)

        client = APIClient()
        response = client.get('/api/v1/tile/1')
        self.assertEquals(response.status_code, 301)

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase, APIClient

from .test_helper import create_difficulty
from minesweeper.models import Difficulty


class DifficultyAPITests(APITestCase):

    def test_get_all_difficulties(self):
        """
        Ensure we can make a call to get all difficulties
        """
        create_difficulty(name='New', cols=5, rows=5)

        # Make the API call
        client = APIClient()
        response = client.get('/api/v1/difficulty/')
        self.assertEquals(response.status_code, 200)
        self.assertEquals(len(response.json()), 1)

    def test_should_allow_us_to_create_difficulties(self):
        """
        We can also create a difficulty
        """
        client = APIClient()
        response = client.post('/api/v1/difficulty/')
        self.assertEquals(response.status_code, 201)

    def test_no_other_routes_available(self):
        """
        We only allow get and create difficulties at this time, 
        all other routes should return errors
        """
        create_difficulty(name='New', cols=5, rows=5, id=1)

        client = APIClient()
        response = client.put('/api/v1/difficulty/')
        self.assertEquals(response.status_code, 405)

        client = APIClient()
        response = client.put('/api/v1/difficulty/1')
        self.assertEquals(response.status_code, 404)

        client = APIClient()
        response = client.delete('/api/v1/difficulty/')
        self.assertEquals(response.status_code, 405)

        client = APIClient()
        response = client.delete('/api/v1/difficulty/1')
        self.assertEquals(response.status_code, 404)

        client = APIClient()
        response = client.get('/api/v1/difficulty/1')
        self.assertEquals(response.status_code, 404)

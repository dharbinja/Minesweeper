from enum import Enum
from datetime import datetime

from django.db import models

class Game(models.Model):
    time_started = models.DateTimeField(default=datetime.now)
    time_ended = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        """String representation of the Game model."""
        return "Game" 

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs) # Save the actual game first


class Tile(models.Model):
    TILE_STATUS = (
        (0, 'Closed'),
        (1, 'Opened'),
        (2, 'Flagged'),
    )

    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    status = models.IntegerField(default=0, choices=TILE_STATUS)
    position = models.IntegerField(default=0)
    is_mine = models.BooleanField()
    mines_around = models.IntegerField()

    def __str__(self):
        """String representation of the Tile model."""
        return "Tile"

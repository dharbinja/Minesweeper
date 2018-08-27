from enum import Enum
from datetime import datetime

from django.db import models

class Game(models.Model):
    time_started = models.DateTimeField(default=datetime.now)
    time_ended = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        """String representation of the Game model."""
        return "Game" 

class TileStatus(Enum):
    CLOSED = 0,
    OPENED = 1,
    FLAGGED = 2

class Tile(models.Model):
    game = models.ForeignKey(Game, on_delete=models.CASCADE)
    status = models.IntegerField(default=TileStatus.CLOSED)
    position = models.IntegerField(default=0)
    is_mine = models.BooleanField()
    mines_around = models.IntegerField()

    def __str__(self):
        """String representation of the Tile model."""
        return "Tile"

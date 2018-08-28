from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Game, Tile

@receiver(post_save, sender=Game)
def post_game_create(sender, **wargs):
    print("POST GAME CREATE!")
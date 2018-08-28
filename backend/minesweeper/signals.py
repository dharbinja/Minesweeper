from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Game, Tile

@receiver(post_save, sender=Game)
def post_game_cretaed(sender, instance, created, **kwargs):
    if created:
        print('New Game Created. Building Tiles...')
        instance.build_game_tiles()
        
         
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from django.utils import timezone

from .models import Game, Tile


@receiver(post_save, sender=Game)
def post_game_created(sender, instance, created, **kwargs):
    """
    When a new game is created via a POST /game call, we will go ahead and build out the 
    whole minesweeper "map" on the back end by generating tiles.
    """
    if created:
        instance.build_game_tiles()


@receiver(post_save, sender=Tile)
def post_tile_updated(sender, instance, **kwargs):
    """
    If we opened a tile that is not a mine and has 0 neighbouring mines, we will
    Open up the neighbours of that tile as well (recursively)
    """
    if instance.status == 'Opened':
        instance.game.open_tile(instance)

from django.contrib import admin

from .models import Difficulty, Game, Tile

# No real need to have the Admin interface expose games and tiles, they
# really should just be created via the API
#admin.site.register(Game)
#admin.site.register(Tile)

# We will expose game difficulties though
admin.site.register(Difficulty)
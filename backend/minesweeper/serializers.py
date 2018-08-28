from rest_framework import serializers

from .models import Game, Tile

class TileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tile
        fields = (
            'id',
            'status',
            'position',
        )
        read_only_fields = (
            'position',
        )

class GameSerializer(serializers.ModelSerializer):
    tile_set = TileSerializer(many=True, read_only=True)

    class Meta:
        model = Game
        fields = (
            'id',
            'time_started',
            'time_ended',
            'tile_set',
        )
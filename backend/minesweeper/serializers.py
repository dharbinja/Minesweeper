from rest_framework import serializers

from .models import Game, Tile

class GameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = (
            'id',
            'time_started',
            'time_ended',
        )

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
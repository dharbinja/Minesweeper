from rest_framework import serializers

from .models import Difficulty, Game, Tile

class DifficultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Difficulty
        fields = (
            'name',
            'rows',
            'columns',
            'num_mines',
        )

class TileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tile
        fields = (
            'id',
            'status',
            'row',
            'column',
        )
        read_only_fields = (
            'row',
            'column',
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
            'difficulty',
        )
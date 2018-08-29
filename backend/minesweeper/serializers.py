from rest_framework import serializers

from .models import Difficulty, Game, Tile

class DifficultySerializer(serializers.ModelSerializer):
    class Meta:
        model = Difficulty
        fields = (
            'id',
            'name',
            'rows',
            'columns',
            'num_mines',
        )


class TileSerializer(serializers.ModelSerializer):
    is_mine = serializers.SerializerMethodField()
    neighbouring_mines = serializers.SerializerMethodField()

    class Meta:
        model = Tile
        fields = (
            'id',
            'status',
            'row',
            'column',
            'is_mine',
            'neighbouring_mines',
        )
        read_only_fields = (
            'row',
            'column',
            'is_mine',
            'neighbouring_mines',
        )
    
    def get_is_mine(self, obj):
        if obj.status == 'Opened':
            return obj.is_mine

    def get_neighbouring_mines(self, obj):
        if obj.status == 'Opened':
            return obj.neighbouring_mines


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
            'result',
        )
        read_only_fields = (
            'result',
        )
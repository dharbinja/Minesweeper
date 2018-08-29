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
    is_exploded_mine = serializers.SerializerMethodField()
    wrongly_flagged = serializers.SerializerMethodField()
    neighbouring_mines = serializers.SerializerMethodField()

    class Meta:
        model = Tile
        fields = (
            'id',
            'status',
            'row',
            'column',
            'is_mine',
            'is_exploded_mine',
            'wrongly_flagged',
            'neighbouring_mines',
        )
        read_only_fields = (
            'row',
            'column',
            'is_mine',
            'is_exploded_mine',
            'wrongly_flagged',
            'neighbouring_mines',
        )
    
    def get_is_mine(self, obj):
        if obj.status == 'Opened':
            return obj.is_mine

    def get_neighbouring_mines(self, obj):
        if obj.status == 'Opened':
            return obj.neighbouring_mines
    
    def get_is_exploded_mine(self, obj):
        if obj.status == 'Opened':
            return obj.is_exploded_mine

    def get_wrongly_flagged(self, obj):
        if obj.status == 'Flagged':
            return obj.wrongly_flagged


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
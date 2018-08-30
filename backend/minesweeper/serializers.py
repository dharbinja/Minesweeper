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

    # The important thing to note here is that we only allow
    # the editing of the "status" field on the mine, the rest
    # will be set on the back end
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
        """
        Returns the is_mine attribute only if the tile is opened
        """
        if obj.status == 'Opened':
            return obj.is_mine

    def get_neighbouring_mines(self, obj):
        """
        Returns the neighbouring_mines attribute only if the tile is opened
        """
        if obj.status == 'Opened':
            return obj.neighbouring_mines
    
    def get_is_exploded_mine(self, obj):
        """
        Returns the is_exploded_mine attribute only if the tile is opened
        """
        if obj.status == 'Opened':
            return obj.is_exploded_mine

    def get_wrongly_flagged(self, obj):
        """
        Returns the wrongly_flagged attribute only if the tile is flagged
        """
        if obj.status == 'Flagged':
            return obj.wrongly_flagged


class GameSerializer(serializers.ModelSerializer):
    # The fields we want to be returned from the API call. Notice
    # that result cannot be set via the API
    class Meta:
        model = Game
        fields = (
            'id',
            'time_started',
            'time_ended',
            'difficulty',
            'result',
        )
        read_only_fields = (
            'result',
        )
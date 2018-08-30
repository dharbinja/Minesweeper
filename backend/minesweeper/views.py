from rest_framework import generics

from .models import Difficulty, Game, Tile
from .serializers import DifficultySerializer, GameSerializer, TileSerializer


class DifficultyList(generics.ListCreateAPIView):
    queryset = Difficulty.objects.all()
    serializer_class = DifficultySerializer


class GameList(generics.ListCreateAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer


class GameDetail(generics.RetrieveAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer


class TileUpdate(generics.RetrieveUpdateAPIView):
    queryset = Tile.objects.all()
    serializer_class = TileSerializer


class TileList(generics.ListAPIView):
    serializer_class = TileSerializer

    def get_queryset(self):
        """
        Optionally restrics the returned tiles to a given game,
        by filtering against a 'game' query parameter in the URL.
        """
        queryset = Tile.objects.all()
        game = self.request.query_params.get('game', None)
        if game is not None:
            queryset = queryset.filter(game=game)
        return queryset

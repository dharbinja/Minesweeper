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

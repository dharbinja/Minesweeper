from rest_framework import generics

from .models import Game, Tile
from .serializers import GameSerializer, TileSerializer

class GameList(generics.ListCreateAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

class GameDetail(generics.RetrieveAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

class TileUpdate(generics.UpdateAPIView):
    queryset = Tile.objects.all()
    serializer_class = TileSerializer

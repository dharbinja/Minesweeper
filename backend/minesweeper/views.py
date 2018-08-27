from rest_framework import generics

from .models import Game, Tile
from .serializers import GameSerializer, TileSerializer

class ListGame(generics.ListCreateAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

class DetailGame(generics.RetrieveAPIView):
    queryset = Game.objects.all()
    serializer_class = GameSerializer

class UpdateTile(generics.UpdateAPIView):
    queryset = Tile.objects.all()
    serializer_class = TileSerializer

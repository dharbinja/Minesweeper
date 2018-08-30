from django.urls import path

from . import views

urlpatterns = [
    # Get a list of games (GET /game)
    path('game/', views.GameList.as_view()),
    # Get details of a game (GET /game/:id)
    path('game/<int:pk>/', views.GameDetail.as_view()),
    # Get a list of tiles (GET /tile?game=:game_id)
    path('tile/', views.TileList.as_view()),
    # Update a tile (PUT /tile/:id)
    path('tile/<int:pk>/', views.TileUpdate.as_view()),
    # Get a list of difficulties (GET /difficulty/)
    path('difficulty/', views.DifficultyList.as_view()),
]

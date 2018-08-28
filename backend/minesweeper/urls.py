from django.urls import path

from . import views

urlpatterns = [
    path('game/', views.GameList.as_view()),
    path('game/<int:pk>/', views.GameDetail.as_view()),
    path('tile/<int:pk>/', views.TileUpdate.as_view()),
    path('difficulty/', views.DifficultyList.as_view()),
]
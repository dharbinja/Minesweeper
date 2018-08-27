from django.urls import path

from . import views

urlpatterns = [
    path('game/', views.ListGame.as_view()),
    path('game/<int:pk>/', views.DetailGame.as_view()),
    path('tile/<int:pk>/', views.UpdateTile.as_view()),
]
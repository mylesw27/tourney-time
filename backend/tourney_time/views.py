from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TournamentSerializer, ScoreSerializer, PlayerSerializer
from .models import Tournament, Score, Player

class TournamentView(viewsets.ModelViewSet):
    serializer_class = TournamentSerializer
    queryset = Tournament.objects.all()

class ScoreView(viewsets.ModelViewSet):
    serializer_class = ScoreSerializer
    queryset = Score.objects.all()

class PlayersView(viewsets.ModelViewSet):
    serializer_class = PlayerSerializer
    queryset = Player.objects.all()
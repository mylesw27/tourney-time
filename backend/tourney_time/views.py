from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TournamentSerializer
from .models import Tournament

class TournamentView(viewsets.ModelViewSet):
    serializer_class = TournamentSerializer
    queryset = Tournament.objects.all()
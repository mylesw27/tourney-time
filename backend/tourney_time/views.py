from django.shortcuts import render
from rest_framework import viewsets
from .serializers import TournamentSerializer, ScoreSerializer, PlayerSerializer, UserSerializer
from .models import Tournament, Score, Player
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class TournamentView(viewsets.ModelViewSet):
    serializer_class = TournamentSerializer
    queryset = Tournament.objects.all()

class ScoreView(viewsets.ModelViewSet):
    serializer_class = ScoreSerializer
    queryset = Score.objects.all()

class PlayersView(viewsets.ModelViewSet):
    serializer_class = PlayerSerializer
    queryset = Player.objects.all()

class UsersView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class HomeView(APIView):     
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        content = {'message': 'Welcome to the JWT Authentication page using React Js and Django!'}
        return Response(content)
    
class LogoutView(APIView):
     permission_classes = (IsAuthenticated,)
     def post(self, request):
          
          try:
               refresh_token = request.data["refresh_token"]
               token = RefreshToken(refresh_token)
               token.blacklist()
               return Response(status=status.HTTP_205_RESET_CONTENT)
          except Exception as e:
               return Response(status=status.HTTP_400_BAD_REQUEST)
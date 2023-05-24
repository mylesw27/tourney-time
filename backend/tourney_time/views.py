from django.shortcuts import render
from rest_framework import viewsets, mixins
from .serializers import TournamentSerializer, ScoreSerializer, PlayerSerializer, UserSerializer, PlayerPostSerializer
from .models import Tournament, Score, Player
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse, HttpResponse
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.hashers import make_password
from django.views.decorators.csrf import csrf_exempt
import json
from rest_framework import status

class TournamentView(viewsets.ModelViewSet):
    serializer_class = TournamentSerializer
    queryset = Tournament.objects.all()

class ScoreView(viewsets.ModelViewSet):
    serializer_class = ScoreSerializer
    queryset = Score.objects.all()

    def create(self, request, *args, **kwargs):
        tournament = request.data.get('tournament')
        round_number = request.data.get('round')
        user = request.data.get('user')

        scorecard = Score.objects.filter(tournament=tournament, round=round_number, user=user).first()
        print(f"checking {tournament} {round_number} {user}")
        if scorecard:
            serializer = self.get_serializer(scorecard)
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        print(f"creating {tournament} {round_number} {user}")
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


class PlayersView(viewsets.ModelViewSet):
    serializer_class = PlayerSerializer
    queryset = Player.objects.all()

class PlayerPostView(viewsets.ModelViewSet):
    serializer_class = PlayerPostSerializer
    queryset = Player.objects.all()

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(status=status.HTTP_204_NO_CONTENT)

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
          
@csrf_exempt
def register_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        username = data.get("username")
        password = make_password(data.get("password"))

        user = User.objects.create(username=username, password=password)

        if user: 
            refresh = RefreshToken.for_user(user)
            res_data = {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'message': 'User Created'
            }

            return JsonResponse(res_data, status=201)
        else:
            return JsonResponse({"error": "Unable to register user"}, status=400)
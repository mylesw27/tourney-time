from rest_framework import serializers
from .models import Tournament, Score, Player

class TournamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = ('id','name', 'date1', 'date2', 'date3', 'date4', 'course1', 'course2', 'course3', 'course4')

class ScoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Score
        fields = ('id', 'user', 'tournament', 'course', 'date', 'partners', 'hole1', 'hole2', 'hole3', 'hole4', 'hole5', 'hole6', 'hole7', 'hole8', 'hole9', 'hole10', 'hole11', 'hole12', 'hole13', 'hole14', 'hole15', 'hole16', 'hole17', 'hole18')

class PlayerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Player
        fields = ('player', 'tournament')
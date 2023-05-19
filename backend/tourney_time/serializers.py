from rest_framework import serializers
from .models import Tournament

class TournamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = ('name', 'date1', 'date2', 'date3', 'date4', 'course1', 'course2', 'course3', 'course4')
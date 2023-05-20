from django.contrib import admin
from .models import Tournament, Score, Player

admin.site.register(Tournament)
admin.site.register(Score)
admin.site.register(Player)
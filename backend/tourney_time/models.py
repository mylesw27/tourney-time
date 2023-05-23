from django.db import models
from django.conf import settings
from django.contrib.postgres.fields import HStoreField

class Tournament(models.Model):
    # Name
    name = models.CharField(max_length=120)
    # Organizer
    organizer = models.ForeignKey(settings.AUTH_USER_MODEL, null=True, on_delete=models.SET_NULL, related_name="organizer")
    # Dates
    date1 = models.DateField()
    date2 = models.DateField(blank=True, null=True)
    date3 = models.DateField(blank=True, null=True)
    date4 = models.DateField(blank=True, null=True)
    # Courses
    course1 = models.TextField()
    course2 = models.TextField(blank=True, null=True)
    course3 = models.TextField(blank=True, null=True)
    course4 = models.TextField(blank=True, null=True)
    # Players
    players = models.ManyToManyField(settings.AUTH_USER_MODEL, through="Player", related_name="players", blank=True, null=True)

    def _str_(self):
        return self.name
    
    def get_players():
        players = Player.objects.prefetch_related('player')


class Player(models.Model):
    player = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE)
    
class Score(models.Model):
    # foreign key - user id
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    # foreign key - tournament
    tournament = models.ForeignKey(Tournament, related_name='scores', on_delete=models.CASCADE)
    # round
    round = models.IntegerField(default=1)
    # course
    course = models.TextField()
    # date
    date = models.DateField()
    # partners
    # partners = HStoreField(child=models.CharField, allow_empty=True)
    # Hole 1 Score
    hole1 = models.IntegerField(blank=True, null=True)
    hole2 = models.IntegerField(blank=True, null=True)
    hole3 = models.IntegerField(blank=True, null=True)
    hole4 = models.IntegerField(blank=True, null=True)
    hole5 = models.IntegerField(blank=True, null=True)
    hole6 = models.IntegerField(blank=True, null=True)
    hole7 = models.IntegerField(blank=True, null=True)
    hole8 = models.IntegerField(blank=True, null=True)
    hole9 = models.IntegerField(blank=True, null=True)
    hole10 = models.IntegerField(blank=True, null=True)
    hole11 = models.IntegerField(blank=True, null=True)
    hole12 = models.IntegerField(blank=True, null=True)
    hole13 = models.IntegerField(blank=True, null=True)
    hole14 = models.IntegerField(blank=True, null=True)
    hole15 = models.IntegerField(blank=True, null=True)
    hole16 = models.IntegerField(blank=True, null=True)
    hole17 = models.IntegerField(blank=True, null=True)
    hole18 = models.IntegerField(blank=True, null=True)
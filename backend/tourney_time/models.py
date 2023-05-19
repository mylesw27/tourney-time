from django.db import models

class Tournament(models.Model):
    # Name
    name = models.CharField(max_length=120)
    # Dates
    date1 = models.DateField()
    date2 = models.DateField(blank=True)
    date3 = models.DateField(blank=True)
    date4 = models.DateField(blank=True)
    # Courses
    course1 = models.TextField()
    course2 = models.TextField(blank=True)
    course3 = models.TextField(blank=True)
    course4 = models.TextField(blank=True)
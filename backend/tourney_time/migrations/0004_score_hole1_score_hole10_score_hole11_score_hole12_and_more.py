# Generated by Django 4.2.1 on 2023-05-20 03:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tourney_time', '0003_score'),
    ]

    operations = [
        migrations.AddField(
            model_name='score',
            name='hole1',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='score',
            name='hole10',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='score',
            name='hole11',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='score',
            name='hole12',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='score',
            name='hole13',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='score',
            name='hole14',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='score',
            name='hole15',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='score',
            name='hole16',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='score',
            name='hole17',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='score',
            name='hole18',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='score',
            name='hole2',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='score',
            name='hole3',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='score',
            name='hole4',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='score',
            name='hole5',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='score',
            name='hole6',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='score',
            name='hole7',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='score',
            name='hole8',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='score',
            name='hole9',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='tournament',
            name='date2',
            field=models.DateField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='tournament',
            name='date3',
            field=models.DateField(blank=True, null=True),
        ),
    ]

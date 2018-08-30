# Generated by Django 2.1 on 2018-08-30 01:18

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('minesweeper', '0010_tile_wrongly_flagged'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='tile',
            options={},
        ),
        migrations.AlterField(
            model_name='game',
            name='time_started',
            field=models.DateTimeField(default=datetime.datetime.now, editable=False),
        ),
    ]
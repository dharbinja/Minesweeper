# Generated by Django 2.1 on 2018-08-28 04:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('minesweeper', '0002_auto_20180828_0406'),
    ]

    operations = [
        migrations.AddField(
            model_name='difficulty',
            name='name',
            field=models.CharField(max_length=20, null=True),
        ),
    ]
# Generated by Django 5.0.6 on 2025-01-20 07:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_userticket'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userticket',
            name='seat_no',
        ),
        migrations.AddField(
            model_name='userticket',
            name='seat_nos',
            field=models.JSONField(default=list),
        ),
    ]

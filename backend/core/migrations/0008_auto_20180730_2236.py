# Generated by Django 2.0.7 on 2018-07-30 22:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0007_event_featured'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='going_to',
            field=models.ManyToManyField(blank=True, null=True, related_name='users_going', to='core.Event'),
        ),
        migrations.AddField(
            model_name='user',
            name='interested_in',
            field=models.ManyToManyField(blank=True, null=True, related_name='users_interested', to='core.Event'),
        ),
        migrations.AddField(
            model_name='user',
            name='subscribed_to',
            field=models.ManyToManyField(blank=True, null=True, related_name='users_subscribed', to='core.Host'),
        ),
    ]
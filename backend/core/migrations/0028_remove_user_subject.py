# Generated by Django 2.1 on 2018-08-29 19:10

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0027_user_university_age_category'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='subject',
        ),
    ]
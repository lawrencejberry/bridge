# Generated by Django 2.0.7 on 2018-07-31 18:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0010_auto_20180730_2251'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='location',
            field=models.CharField(blank=True, max_length=250),
        ),
        migrations.AddField(
            model_name='eventcategory',
            name='featured',
            field=models.BooleanField(default=False),
        ),
    ]
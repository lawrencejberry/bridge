# Generated by Django 2.0.7 on 2018-08-09 22:16

from django.db import migrations
import versatileimagefield.fields


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0017_auto_20180806_2021'),
    ]

    operations = [
        migrations.AddField(
            model_name='eventcategory',
            name='thumbnail',
            field=versatileimagefield.fields.VersatileImageField(blank=True, upload_to='images/event-categories/%Y/%m/%d/', verbose_name='Image'),
        ),
        migrations.AddField(
            model_name='eventcategory',
            name='thumbnail_ppoi',
            field=versatileimagefield.fields.PPOIField(blank=True, default='0.5x0.5', editable=False, max_length=20),
        ),
        migrations.AddField(
            model_name='hostcategory',
            name='thumbnail',
            field=versatileimagefield.fields.VersatileImageField(blank=True, upload_to='images/host-categories/%Y/%m/%d/', verbose_name='Image'),
        ),
        migrations.AddField(
            model_name='hostcategory',
            name='thumbnail_ppoi',
            field=versatileimagefield.fields.PPOIField(blank=True, default='0.5x0.5', editable=False, max_length=20),
        ),
    ]
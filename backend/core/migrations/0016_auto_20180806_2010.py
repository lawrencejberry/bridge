# Generated by Django 2.0.7 on 2018-08-06 20:10

from django.db import migrations
import versatileimagefield.fields


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0015_auto_20180806_2006'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='image',
            field=versatileimagefield.fields.VersatileImageField(blank=True, upload_to='images/events/%Y/%m/%d/', verbose_name='Image'),
        ),
        migrations.AlterField(
            model_name='event',
            name='image_ppoi',
            field=versatileimagefield.fields.PPOIField(blank=True, default='0.5x0.5', editable=False, max_length=20),
        ),
    ]
# Generated by Django 2.1 on 2018-08-31 20:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0029_user_subject'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='event',
            name='image_ppoi',
        ),
        migrations.RemoveField(
            model_name='host',
            name='image_ppoi',
        ),
        migrations.RemoveField(
            model_name='host',
            name='logo_ppoi',
        ),
        migrations.AlterField(
            model_name='event',
            name='image',
            field=models.ImageField(default='placeholders/event.jpeg', upload_to='images/events/%Y/%m/%d/'),
        ),
        migrations.AlterField(
            model_name='host',
            name='image',
            field=models.ImageField(default='placeholders/host.jpeg', upload_to='images/hosts/pictures/%Y/%m/%d/'),
        ),
        migrations.AlterField(
            model_name='host',
            name='logo',
            field=models.ImageField(blank=True, upload_to='images/hosts/logos/%Y/%m/%d/'),
        ),
    ]

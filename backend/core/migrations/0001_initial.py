# Generated by Django 2.1 on 2018-09-01 21:15

import core.models
import datetime
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import mptt.fields


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0009_alter_user_last_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('password', models.CharField(max_length=128, verbose_name='password')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('first_name', models.CharField(blank=True, max_length=30, verbose_name='first name')),
                ('last_name', models.CharField(blank=True, max_length=150, verbose_name='last name')),
                ('is_staff', models.BooleanField(default=False, help_text='Designates whether the user can log into this admin site.', verbose_name='staff status')),
                ('is_active', models.BooleanField(default=True, help_text='Designates whether this user should be treated as active. Unselect this instead of deleting accounts.', verbose_name='active')),
                ('date_joined', models.DateTimeField(default=django.utils.timezone.now, verbose_name='date joined')),
                ('email', models.EmailField(max_length=254, unique=True, verbose_name='email address')),
                ('university_age_category', models.CharField(blank=True, choices=[('Undergraduate', 'Undergraduate'), ('Postgraduate', 'Postgraduate'), ('Faculty and staff', 'Faculty and staff')], max_length=255)),
                ('subject', models.CharField(blank=True, choices=[('Physics', 'Physics')], max_length=255)),
                ('matriculation_year', models.IntegerField(blank=True, null=True)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.Group', verbose_name='groups')),
            ],
            options={
                'verbose_name': 'User',
                'verbose_name_plural': 'Users',
            },
            managers=[
                ('objects', core.models.UserManager()),
            ],
        ),
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('start_time', models.DateTimeField(default=datetime.datetime.now)),
                ('end_time', models.DateTimeField(default=datetime.datetime.now)),
                ('featured', models.BooleanField(default=False)),
                ('description', models.TextField(blank=True)),
                ('location', models.CharField(blank=True, max_length=250)),
                ('image', models.ImageField(default='/Users/lawrence/Development/bridge-app/backend/media_root/placeholders/event.jpeg', upload_to='images/events/%Y/%m/%d/')),
            ],
            options={
                'verbose_name': 'Event',
                'verbose_name_plural': 'Events',
            },
        ),
        migrations.CreateModel(
            name='EventCategory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
                ('featured', models.BooleanField(default=False)),
                ('thumbnail', models.ImageField(blank=True, upload_to='thumbnails/event_categories/%Y/%m/%d/')),
                ('lft', models.PositiveIntegerField(db_index=True, editable=False)),
                ('rght', models.PositiveIntegerField(db_index=True, editable=False)),
                ('tree_id', models.PositiveIntegerField(db_index=True, editable=False)),
                ('level', models.PositiveIntegerField(db_index=True, editable=False)),
                ('parent', mptt.fields.TreeForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='children', to='core.EventCategory')),
            ],
            options={
                'verbose_name': 'Event Category',
                'verbose_name_plural': 'Event Categories',
            },
        ),
        migrations.CreateModel(
            name='Host',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField(blank=True)),
                ('website', models.URLField(blank=True)),
                ('image', models.ImageField(default='/Users/lawrence/Development/bridge-app/backend/media_root/placeholders/host.jpeg', upload_to='images/hosts/pictures/%Y/%m/%d/')),
                ('logo', models.ImageField(blank=True, upload_to='images/hosts/logos/%Y/%m/%d/')),
                ('admins', models.ManyToManyField(related_name='admin_of', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Host',
                'verbose_name_plural': 'Hosts',
            },
        ),
        migrations.CreateModel(
            name='HostCategory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
                ('thumbnail', models.ImageField(blank=True, upload_to='thumbnails/host_categories/%Y/%m/%d/')),
                ('lft', models.PositiveIntegerField(db_index=True, editable=False)),
                ('rght', models.PositiveIntegerField(db_index=True, editable=False)),
                ('tree_id', models.PositiveIntegerField(db_index=True, editable=False)),
                ('level', models.PositiveIntegerField(db_index=True, editable=False)),
                ('parent', mptt.fields.TreeForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='children', to='core.HostCategory')),
            ],
            options={
                'verbose_name': 'Host Category',
                'verbose_name_plural': 'Host Categories',
            },
        ),
        migrations.CreateModel(
            name='UserCategory',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('lft', models.PositiveIntegerField(db_index=True, editable=False)),
                ('rght', models.PositiveIntegerField(db_index=True, editable=False)),
                ('tree_id', models.PositiveIntegerField(db_index=True, editable=False)),
                ('level', models.PositiveIntegerField(db_index=True, editable=False)),
                ('parent', mptt.fields.TreeForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='children', to='core.UserCategory')),
            ],
            options={
                'verbose_name': 'User Category',
                'verbose_name_plural': 'User Categories',
            },
        ),
        migrations.AddField(
            model_name='host',
            name='category',
            field=mptt.fields.TreeForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='hosts', to='core.HostCategory'),
        ),
        migrations.AddField(
            model_name='host',
            name='open_to',
            field=mptt.fields.TreeForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='hosts', to='core.UserCategory'),
        ),
        migrations.AddField(
            model_name='event',
            name='category',
            field=mptt.fields.TreeForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='events', to='core.EventCategory'),
        ),
        migrations.AddField(
            model_name='event',
            name='hosts',
            field=models.ManyToManyField(related_name='events_hosting', to='core.Host'),
        ),
        migrations.AddField(
            model_name='event',
            name='open_to',
            field=mptt.fields.TreeForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='events', to='core.UserCategory'),
        ),
        migrations.AddField(
            model_name='user',
            name='interested_in',
            field=models.ManyToManyField(blank=True, related_name='users_interested', to='core.Event'),
        ),
        migrations.AddField(
            model_name='user',
            name='subscribed_to',
            field=models.ManyToManyField(blank=True, related_name='users_subscribed', to='core.Host'),
        ),
        migrations.AddField(
            model_name='user',
            name='user_category',
            field=mptt.fields.TreeForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='users', to='core.UserCategory'),
        ),
        migrations.AddField(
            model_name='user',
            name='user_permissions',
            field=models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.Permission', verbose_name='user permissions'),
        ),
    ]
# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import uuid
from django.conf import settings


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0006_require_contenttypes_0002'),
    ]

    operations = [
        migrations.CreateModel(
            name='MyUser',
            fields=[
                ('password', models.CharField(verbose_name='password', max_length=128)),
                ('last_login', models.DateTimeField(null=True, blank=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, verbose_name='superuser status', help_text='Designates that this user has all permissions without explicitly assigning them.')),
                ('uuid', models.UUIDField(primary_key=True, editable=False, default=uuid.uuid4, serialize=False)),
                ('first_name', models.CharField(max_length=32)),
                ('last_name', models.CharField(max_length=32)),
                ('email', models.EmailField(unique=True, verbose_name='email address', max_length=255)),
                ('is_active', models.BooleanField(default=True)),
                ('is_admin', models.BooleanField(default=False)),
                ('is_staff', models.BooleanField(default=False)),
                ('address', models.CharField(blank=True, max_length=128)),
                ('state', models.CharField(blank=True, max_length=64)),
                ('city', models.CharField(blank=True, max_length=64)),
                ('country', models.CharField(blank=True, max_length=64)),
                ('join_date', models.DateTimeField(auto_now_add=True)),
                ('groups', models.ManyToManyField(blank=True, related_query_name='user', to='auth.Group', related_name='user_set', help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, related_query_name='user', to='auth.Permission', related_name='user_set', help_text='Specific permissions for this user.', verbose_name='user permissions')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Candidate',
            fields=[
                ('id', models.AutoField(primary_key=True, auto_created=True, verbose_name='ID', serialize=False)),
                ('rank', models.IntegerField()),
                ('current_company', models.CharField(blank=True, max_length=128)),
                ('current_title', models.CharField(blank=True, max_length=256)),
                ('visible', models.BooleanField(default=True)),
                ('password_view_seen_timestamp', models.DateTimeField(null=True, blank=True)),
                ('password_submitted_timestamp', models.DateTimeField(null=True, blank=True)),
                ('accomplishments_submitted_timestamp', models.DateTimeField(null=True, blank=True)),
                ('status', models.CharField(blank=True, max_length=2, choices=[('SL', 'Secretly looking'), ('JL', 'Just looking')])),
                ('accomplishments', models.TextField(null=True, blank=True)),
                ('user', models.OneToOneField(to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]

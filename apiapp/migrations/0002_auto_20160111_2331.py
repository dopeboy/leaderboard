# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('apiapp', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='List',
            fields=[
                ('uuid', models.UUIDField(serialize=False, primary_key=True, default=uuid.uuid4, editable=False)),
                ('name', models.CharField(max_length=32)),
                ('location', models.CharField(max_length=32)),
                ('created', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.AddField(
            model_name='candidate',
            name='list',
            field=models.ForeignKey(to='apiapp.List', default=None),
            preserve_default=False,
        ),
    ]

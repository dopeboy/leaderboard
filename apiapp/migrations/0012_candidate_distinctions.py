# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apiapp', '0011_auto_20160214_2205'),
    ]

    operations = [
        migrations.AddField(
            model_name='candidate',
            name='distinctions',
            field=models.ManyToManyField(through='apiapp.CandidateDistinction', to='apiapp.Distinction'),
        ),
    ]

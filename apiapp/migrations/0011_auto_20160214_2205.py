# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apiapp', '0010_auto_20160214_2151'),
    ]

    operations = [
        migrations.CreateModel(
            name='CandidateDistinction',
            fields=[
                ('id', models.AutoField(auto_created=True, verbose_name='ID', serialize=False, primary_key=True)),
                ('quantity', models.IntegerField()),
            ],
        ),
        migrations.RemoveField(
            model_name='candidate',
            name='distinctions',
        ),
        migrations.RemoveField(
            model_name='distinction',
            name='quantity',
        ),
        migrations.AddField(
            model_name='candidatedistinction',
            name='candidate',
            field=models.ForeignKey(to='apiapp.Candidate'),
        ),
        migrations.AddField(
            model_name='candidatedistinction',
            name='distinction',
            field=models.ForeignKey(to='apiapp.Distinction'),
        ),
    ]

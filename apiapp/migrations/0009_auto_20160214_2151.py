# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apiapp', '0008_candidate_linkedin_url'),
    ]

    operations = [
        migrations.CreateModel(
            name='Distinction',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', auto_created=True, primary_key=True)),
                ('text', models.CharField(max_length=320)),
                ('quantity', models.IntegerField()),
                ('list', models.ForeignKey(to='apiapp.List')),
            ],
        ),
        migrations.AddField(
            model_name='candidate',
            name='distinctions',
            field=models.ManyToManyField(null=True, to='apiapp.Distinction', blank=True),
        ),
    ]

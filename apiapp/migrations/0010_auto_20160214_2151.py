# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apiapp', '0009_auto_20160214_2151'),
    ]

    operations = [
        migrations.AlterField(
            model_name='candidate',
            name='distinctions',
            field=models.ManyToManyField(to='apiapp.Distinction', blank=True),
        ),
    ]

# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apiapp', '0013_auto_20160214_2339'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='candidate',
            options={'ordering': ['score']},
        ),
        migrations.AddField(
            model_name='candidate',
            name='score',
            field=models.DecimalField(null=True, max_digits=10, decimal_places=7),
        ),
        migrations.AlterUniqueTogether(
            name='candidate',
            unique_together=set([]),
        ),
        migrations.RemoveField(
            model_name='candidate',
            name='rank',
        ),
    ]

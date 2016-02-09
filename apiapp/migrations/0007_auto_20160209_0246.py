# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apiapp', '0006_candidate_preclaim_view_seen'),
    ]

    operations = [
        migrations.AlterField(
            model_name='candidate',
            name='status',
            field=models.CharField(max_length=2, blank=True, choices=[('SL', 'Maybe'), ('JL', 'Yes'), ('NI', 'No')]),
        ),
    ]

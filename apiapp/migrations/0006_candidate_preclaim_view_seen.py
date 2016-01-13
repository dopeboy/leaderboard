# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apiapp', '0005_list_title'),
    ]

    operations = [
        migrations.AddField(
            model_name='candidate',
            name='preclaim_view_seen',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]

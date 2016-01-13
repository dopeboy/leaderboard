# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apiapp', '0004_list_description'),
    ]

    operations = [
        migrations.AddField(
            model_name='list',
            name='title',
            field=models.CharField(max_length=256, default=''),
            preserve_default=False,
        ),
    ]

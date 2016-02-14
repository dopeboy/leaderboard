# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apiapp', '0007_auto_20160209_0246'),
    ]

    operations = [
        migrations.AddField(
            model_name='candidate',
            name='linkedin_url',
            field=models.CharField(blank=True, max_length=256, null=True),
        ),
    ]

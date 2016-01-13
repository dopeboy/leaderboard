# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apiapp', '0003_auto_20160111_2342'),
    ]

    operations = [
        migrations.AddField(
            model_name='list',
            name='description',
            field=models.CharField(default='', max_length=256),
            preserve_default=False,
        ),
    ]

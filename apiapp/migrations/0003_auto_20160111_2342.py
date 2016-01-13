# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('apiapp', '0002_auto_20160111_2331'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='candidate',
            unique_together=set([('rank', 'list')]),
        ),
    ]

# Generated by Django 2.2 on 2020-08-16 15:24

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20200816_2003'),
    ]

    operations = [
        migrations.AlterField(
            model_name='grade',
            name='assignment',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.Assignment', verbose_name='assignment'),
        ),
    ]

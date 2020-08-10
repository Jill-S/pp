# Generated by Django 2.2 on 2020-08-09 13:10

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20200809_1401'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='team',
            field=models.OneToOneField(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.Team', verbose_name='Team'),
            preserve_default=False,
        ),
    ]
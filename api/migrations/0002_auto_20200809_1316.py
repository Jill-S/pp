# Generated by Django 2.2 on 2020-08-09 07:46

from django.db import migrations, models
import django.db.models.deletion
import jsonfield.fields


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='team',
            name='guide',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='api.Guide', verbose_name='guide'),
        ),
        migrations.AlterField(
            model_name='guide',
            name='thrust_area',
            field=jsonfield.fields.JSONField(),
        ),
    ]
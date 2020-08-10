# Generated by Django 2.2 on 2020-08-09 13:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_auto_20200809_1857'),
    ]

    operations = [
        migrations.AddField(
            model_name='guide',
            name='branch',
            field=models.CharField(choices=[('IT', 'Information Technology'), ('CS', 'Computer Science'), ('Mech', 'Mechanical'), ('EXTC', 'Electronics And Telecommunication'), ('ETRX', 'Electronics')], default='IT', max_length=4, verbose_name='branch'),
        ),
    ]

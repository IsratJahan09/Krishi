# Generated migration file

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('scanner', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('phone_number', models.CharField(max_length=15, unique=True)),
                ('name', models.CharField(max_length=100)),
                ('password', models.CharField(max_length=255)),
                ('role', models.CharField(choices=[('farmer', 'Farmer'), ('admin', 'Admin')], default='farmer', max_length=10)),
                ('language', models.CharField(choices=[('english', 'English'), ('bangla', 'Bangla')], default='bangla', max_length=10)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.AddField(
            model_name='scanresult',
            name='user',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='scans', to='scanner.user'),
        ),
    ]

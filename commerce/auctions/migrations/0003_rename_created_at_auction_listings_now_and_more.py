# Generated by Django 5.1.1 on 2024-09-21 08:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('auctions', '0002_auction_listings_bids_comments'),
    ]

    operations = [
        migrations.RenameField(
            model_name='auction_listings',
            old_name='created_at',
            new_name='now',
        ),
        migrations.RenameField(
            model_name='auction_listings',
            old_name='image_url',
            new_name='url',
        ),
    ]
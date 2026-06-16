import requests
from django.core.management.base import BaseCommand
from inventory.models import AppleDevice


class Command(BaseCommand):
    help = "Seed Apple devices from AppleDB API"

    def handle(self, *args, **kwargs):
        url = "https://api.appledb.dev/device/main.json"

        self.stdout.write("Fetching devices from AppleDB...")

        response = requests.get(url)
        data = response.json()
        print(data)
        count = 0

        seen_keys = set()

        for device in data:

            key = device.get("key")

            if not key:
                continue

            if device.get("internal"):
                continue

            if key in seen_keys:
                continue

            seen_keys.add(key)

            name = device.get("name")
            device_type = device.get("type")
            release = device.get("released")
            model_numbers = device.get("model", [])
            release_year = None
            if release:
                if isinstance(release, list):
                    release = release[0]
                try:
                    release_year = int(release[:4])
                except:
                    pass

            obj, created = AppleDevice.objects.get_or_create(
                identifier=key,  # ← IMPORTANT: use key, not model number
                defaults={
                    "name": name,
                    "device_type": device_type or "Unknown",
                    "release_year": release_year,
                    "model": model_numbers,
                }
            )

            if created:
                count += 1

        self.stdout.write(self.style.SUCCESS(f"Added {count} devices."))
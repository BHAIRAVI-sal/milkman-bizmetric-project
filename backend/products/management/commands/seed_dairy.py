from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.db import transaction
from products.models import Category, MilkType, Quantity, Product

class Command(BaseCommand):
    def handle(self, *args, **options):
        with transaction.atomic():
            cat_names = [
                "Milk",
                "Curd & Yogurt",
                "Lassi",
                "Paneer",
                "Butter",
                "Cheese",
                "Ghee",
                "Buttermilk",
                "Cream",
            ]
            cats = {}
            for n in cat_names:
                cat, _ = Category.objects.get_or_create(name=n, defaults={"image": "categories/placeholder.jpg"})
                cats[n] = cat

            milk_types = [
                "Cow Milk",
                "Buffalo Milk",
                "Toned Milk",
                "Full Cream Milk",
                "Skimmed Milk",
                "Organic Milk",
            ]
            types = {}
            for n in milk_types:
                t, _ = MilkType.objects.get_or_create(name=n)
                types[n] = t

            qty_specs = [
                ("250ml", 28),
                ("500ml", 55),
                ("1L", 100),
                ("2L", 190),
                ("200g", 60),
                ("500g", 140),
                ("1kg", 260),
            ]
            qtys = {}
            for label, price in qty_specs:
                q, _ = Quantity.objects.get_or_create(label=label, defaults={"price": price})
                if q.price != price:
                    q.price = price
                    q.save()
                qtys[label] = q

            milk_products = [
                ("Fresh Cow Milk", "Pure farm fresh cow milk", "Cow Milk"),
                ("Organic Buffalo Milk", "Rich and creamy buffalo milk", "Buffalo Milk"),
                ("Toned Milk", "Balanced nutrition toned milk", "Toned Milk"),
                ("Full Cream Milk", "Full-bodied creamy milk", "Full Cream Milk"),
                ("Skimmed Milk", "Low fat healthy milk", "Skimmed Milk"),
                ("Organic A2 Milk", "Premium organic A2 milk", "Organic Milk"),
            ]
            for name, desc, t in milk_products:
                p, _ = Product.objects.get_or_create(
                    name=name,
                    defaults={
                        "description": desc,
                        "category": cats["Milk"],
                        "milk_type": types[t],
                        "image": "products/placeholder.jpg",
                        "is_subscription_available": True,
                    },
                )
                p.category = cats["Milk"]
                p.milk_type = types[t]
                p.image = p.image or "products/placeholder.jpg"
                p.is_subscription_available = True
                p.save()
                p.quantities.set([qtys["250ml"], qtys["500ml"], qtys["1L"], qtys["2L"]])

            other_defs = [
                ("Paneer", "Soft Malai Paneer", "Fresh paneer for daily meals", ["200g", "500g", "1kg"]),
                ("Butter", "Cultured Butter", "Smooth and flavorful butter", ["200g", "500g"]),
                ("Cheese", "Aged Cheese", "Rich cheese perfect for sandwiches", ["200g", "500g"]),
                ("Curd & Yogurt", "Thick Curd", "Homemade style curd", ["500g", "1kg"]),
                ("Lassi", "Sweet Lassi", "Refreshing traditional drink", ["250ml", "500ml", "1L"]),
                ("Buttermilk", "Masala Chaas", "Spiced buttermilk", ["250ml", "500ml", "1L"]),
                ("Ghee", "Desi Ghee", "Pure desi ghee", ["200g", "500g", "1kg"]),
                ("Cream", "Fresh Cream", "Whipping cream for desserts", ["200g", "500g"]),
            ]
            for cat_name, prod_name, desc, qty_labels in other_defs:
                p, _ = Product.objects.get_or_create(
                    name=prod_name,
                    defaults={
                        "description": desc,
                        "category": cats[cat_name],
                        "image": "products/placeholder.jpg",
                        "is_subscription_available": False,
                    },
                )
                p.category = cats[cat_name]
                p.save()
                p.quantities.set([qtys[l] for l in qty_labels])

            if not User.objects.filter(username="demo").exists():
                u = User(username="demo", email="demo@example.com")
                u.set_password("demo12345")
                u.save()

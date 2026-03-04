from django.urls import path
from .views import CategoryListView, ProductListView, ProductByCategoryView, admin_stock_list, admin_stock_upsert

urlpatterns = [
    path('categories/', CategoryListView.as_view()),
    path('products/', ProductListView.as_view()),
    path('products/category/<int:category_id>/', ProductByCategoryView.as_view()),
    path('admin/stocks/', admin_stock_list),
    path('admin/stocks/upsert/', admin_stock_upsert),
]
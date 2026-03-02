from django.urls import path
from .views import CategoryListView, ProductListView, ProductByCategoryView

urlpatterns = [
    path('categories/', CategoryListView.as_view()),
    path('products/', ProductListView.as_view()),
    path('products/category/<int:category_id>/', ProductByCategoryView.as_view()),
]
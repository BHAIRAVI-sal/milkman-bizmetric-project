from django.urls import path
from .views import RegisterView, UserProfileView, signup, CustomerTokenObtainPairView, AdminTokenObtainPairView


urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('me/', UserProfileView.as_view()),
    path('signup/', signup),
    path('login/customer/', CustomerTokenObtainPairView.as_view()),
    path('login/admin/', AdminTokenObtainPairView.as_view()),
]

from django.urls import path
from .views.restaurant import RestaurantView
app_name = "restaurants"

urlpatterns = [
    path("<int:res_id>/",RestaurantView.as_view(),name="restaurant_info"),
    path("",RestaurantView.as_view(),name="restaurant"),
]
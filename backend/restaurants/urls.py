from django.urls import path
from .views.restaurant import RestaurantView
from .views.image import ImageView
from .views.search import RestaurantSearch
from .views.restaurant_like import liked_restaurant
app_name = "restaurants"

urlpatterns = [
    path("<int:res_id>/",RestaurantView.as_view(),name="restaurant_info"),
    path("",RestaurantView.as_view(),name="restaurant"),
    path("<int:res_id>/images/",ImageView.as_view(),name="restaurant_images"),
    path("image/",ImageView.as_view(),name="image"),
    path("search/<str:method>/<str:field>/", RestaurantSearch.as_view(), name="restaurant_search"),
    path("like/",liked_restaurant,name="restaurant_like")
]
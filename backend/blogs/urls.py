from django.urls import path
from .views.blog_like import liked_blog
from .views.blog import Blog
from .views.create_blog import CreateAPIView
from .views.restaurant_blog import RestaurantBlogs

app_name = "blogs"

urlpatterns = [
    path("like/", liked_blog, name="liked_blog"),
    path("<int:blog_id>/",Blog.as_view(),name="blog"),
    path("create/",CreateAPIView.as_view(),name='add_blog'),
    path("restaurant/<int:res_id>",RestaurantBlogs.as_view(),name="res_blogs")
]
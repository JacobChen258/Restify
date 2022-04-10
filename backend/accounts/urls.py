from django.urls import path

from rest_framework_simplejwt.views import TokenObtainPairView

from .views.register import Register
from .views.profile import ProfileView
from .views.follow import Follow
from .views.feed import Feed

app_name = "accounts"

urlpatterns = [
    path("register/", Register.as_view(), name="register"),
    path("login/",TokenObtainPairView.as_view(),name="login"),
    path("profile/",ProfileView.as_view(),name="profile"),
    path("follow/",Follow.as_view(),name="follow"),
    path("feed/",Feed.as_view(),name="feed"),
]
from django.urls import path
from notifications.views import NotificationView

app_name = "notifications"

urlpatterns = [
    path("",NotificationView.as_view(),name="notifications")
]
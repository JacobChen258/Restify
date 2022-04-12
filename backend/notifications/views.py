from django.shortcuts import get_object_or_404
from rest_framework.generics import DestroyAPIView
from rest_framework.exceptions import PermissionDenied
from rest_framework.permissions import IsAuthenticated
from notifications.models import Notification
from rest_framework.generics import ListAPIView
from notifications.serializers import GetNotificationsSerializer
from pagination import SmallResultsSetPagination
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST

class NotificationView(DestroyAPIView,ListAPIView):
    serializer_class = GetNotificationsSerializer
    permission_classes = [IsAuthenticated,]
    pagination_class = SmallResultsSetPagination
    
    def get_queryset(self):
        user = self.request.user
        return Notification.objects.filter(viewer=user.id).order_by('creation_time')

    def delete(self, request, *args, **kwargs):
        if 'notif_id' not in self.request.data:
            return Response(status=HTTP_400_BAD_REQUEST)
        return super().delete(request, *args, **kwargs)

    def get_object(self):
        notif = get_object_or_404(Notification,id=self.request.data["notif_id"])
        if notif.viewer.id != self.request.user.id:
            raise PermissionDenied
        return notif

    
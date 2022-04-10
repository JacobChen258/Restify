from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView,CreateAPIView
from comments.serializers import RestaurantCommentSerializer,AddCommentSerializer
from rest_framework.permissions import IsAuthenticated
from comments.models import Comment
from pagination import SmallResultsSetPagination
from restaurants.models import Restaurant
from rest_framework.response import Response
from rest_framework.status import HTTP_201_CREATED
from notifications.serializers import NotificationsSerializer
from accounts.models import User

class CommentView(ListAPIView,CreateAPIView):
    permission_classes = [IsAuthenticated,]
    pagination_class = SmallResultsSetPagination
    
    def get(self, request, *args, **kwargs):
        self.serializer_class = RestaurantCommentSerializer
        return super().get(request, *args, **kwargs)

    def get_queryset(self):
        restaurant = get_object_or_404(Restaurant, id=self.kwargs['res_id'])
        return Comment.objects.filter(restaurant=restaurant).order_by('creation_time')

    def post(self, request, *args, **kwargs):
        self.serializer_class = AddCommentSerializer
        return self.create(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        data["user"] = request.user.id
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        self.notify_owner()
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=HTTP_201_CREATED, headers=headers)

    def notify_owner(self):
        owner = User.objects.filter(id=self.object.owner.id)[0]
        data = {
            'viewer': owner.id,
            'content': f"{self.request.user.username} just commented on your restaurant."

        }
        notify_serializer = NotificationsSerializer(data=data)
        notify_serializer.is_valid(raise_exception=True)
        notify_serializer.save()

from django.shortcuts import get_object_or_404

from ..serializers.follow import FollowedRestaurantSerializer
from ..models import FollowedRestaurant
from restaurants.models import Restaurant
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import CreateAPIView
from rest_framework.generics import DestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.status import HTTP_400_BAD_REQUEST
from notifications.serializers import NotificationsSerializer
class Follow(CreateAPIView,DestroyAPIView):
    serializer_class = FollowedRestaurantSerializer
    permission_classes = [IsAuthenticated,]

    def post(self, request, *args, **kwargs):

        if "restaurant" in request.data:
            self.object = get_object_or_404(Restaurant,id=request.data["restaurant"])

            follow = FollowedRestaurant.objects.filter(user=request.user.id, restaurant=request.data['restaurant'])
            if follow.exists():
                return Response(status=status.HTTP_409_CONFLICT)
            return self.create(request, args, kwargs)

        return Response(status=HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        data['user'] = request.user.id
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        self.notify_owner()
        self.object.num_followers += 1
        self.object.save()
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def delete(self, request, *args, **kwargs):
        if 'restaurant' not in self.request.data:
            return Response(status=HTTP_400_BAD_REQUEST)
        return super().delete(request, *args, **kwargs)

    def perform_destroy(self, instance):
        restaurant = get_object_or_404(Restaurant,id = self.request.data['restaurant'])
        restaurant.num_followers -= 1
        restaurant.save()
        return super().perform_destroy(instance)

    def get_object(self):
        return get_object_or_404(FollowedRestaurant, user=self.request.user.id, restaurant=self.request.data['restaurant'])

    def notify_owner(self):
        content = f"User {self.request.user.first_name} {self.request.user.last_name} just followed your restaurant."
        data = {'viewer':self.object.owner.id,'content':content}
        notif_serializer = NotificationsSerializer(data=data)
        notif_serializer.is_valid(raise_exception=True)
        notif_serializer.save()
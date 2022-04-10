from django.http import Http404
from django.shortcuts import get_object_or_404

from menu_items.serializers import MenuItemSerializer
from menu_items.models import MenuItem
from rest_framework.generics import ListAPIView,DestroyAPIView,CreateAPIView,UpdateAPIView
from rest_framework.permissions import IsAuthenticated
from pagination import SmallResultsSetPagination
from restaurants.models import Restaurant
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework import status
from notifications.serializers import NotificationsSerializer
from accounts.models import FollowedRestaurant
from rest_framework.status import HTTP_200_OK

class MenuItemView(DestroyAPIView,UpdateAPIView,CreateAPIView,ListAPIView):
    permission_classes = [IsAuthenticated,]
    serializer_class = MenuItemSerializer
    pagination_class = SmallResultsSetPagination

    def get_queryset(self):
        res = get_object_or_404(Restaurant,id=self.kwargs['res_id'])
        menu = MenuItem.objects.filter(restaurant=res.id).order_by('id')

        if menu.exists():
            return menu

        raise Http404

    def get_object(self):
        res = get_object_or_404(Restaurant,owner=self.request.user.id)
        item = get_object_or_404(MenuItem,id=self.kwargs["item_id"])
        if item.restaurant.id != res.id:
            raise PermissionDenied
        return item

    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(request.user, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        restaurant = get_object_or_404(Restaurant, owner=request.user.id)
        self.object = restaurant
        return self.create(request, args, kwargs)

    def create(self, request, *args, **kwargs):
        data = self.request.data.copy()
        data['restaurant'] = self.object.id
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        self.notify_users()
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def notify_users(self):
        records = FollowedRestaurant.objects.filter(restaurant=self.object.id)
        content = f"The restaurant {self.object.name} you followed just added a new item."
        data_lst = [{'viewer':record.user.id,'content':content} for record in records]
        notif_serializer = NotificationsSerializer(data=data_lst,many=True)
        notif_serializer.is_valid(raise_exception=True)
        notif_serializer.save()

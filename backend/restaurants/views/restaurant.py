from ..serializers import CreateRestaurantSerializer,EditRestaurantSerializer,RestaurantInfoSerializer
from rest_framework.generics import CreateAPIView,UpdateAPIView
from restaurants.models import Restaurant
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.status import HTTP_200_OK
from django.shortcuts import get_object_or_404
from rest_framework.generics import RetrieveAPIView


class RestaurantView(CreateAPIView,UpdateAPIView,RetrieveAPIView):
    serializer_class = CreateRestaurantSerializer
    permission_classes = [IsAuthenticated,]

    def post(self, request, *args, **kwargs):
        self.serializer_class = CreateRestaurantSerializer
        return self.create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        self.serializer_class = EditRestaurantSerializer
        serializer = self.get_serializer(request.user, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        data = request.data.copy()
        data['owner'] = request.user.id
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        restaurant = Restaurant.objects.filter(owner=self.request.user.id)
        return Response({"id":restaurant[0].id}, status=status.HTTP_201_CREATED, headers=headers)
    
    def get(self, request, *args, **kwargs):
        self.serializer_class = RestaurantInfoSerializer
        return super().get(request, *args, **kwargs)
    
    def get_object(self):
        return get_object_or_404(Restaurant,id=self.kwargs['res_id'])

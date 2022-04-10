from rest_framework import serializers
from restaurants.models import Restaurant

class CreateRestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['owner', 'name', 'address', 'logo', 'email', 'postal_code', 'phone_num']

class EditRestaurantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['name', 'address', 'logo', 'email', 'postal_code', 'phone_num']

    def validate(self, request):
        if request.data['owner'] != request.user.id:
            raise serializers.ValidationError({"Only restaurant owners can edit the restaurant's information"})
        return request

class RestaurantInfoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Restaurant
        fields = ['id','name', 'address', 'logo', 'email', 'postal_code', 'phone_num', 'num_followers', 'num_likes']
from rest_framework.serializers import ModelSerializer,ValidationError
from restaurants.models import Restaurant,Images,Restaurant_Like

class CreateRestaurantSerializer(ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['owner', 'name', 'address', 'logo', 'email', 'postal_code', 'phone_num']

class EditRestaurantSerializer(ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['name', 'address', 'logo', 'email', 'postal_code', 'phone_num']

    def validate(self, request):
        if request.data['owner'] != request.user.id:
            raise ValidationError({"Only restaurant owners can edit the restaurant's information"})
        return request

class RestaurantInfoSerializer(ModelSerializer):

    class Meta:
        model = Restaurant
        fields = ['id','name', 'address', 'logo', 'email', 'postal_code', 'phone_num', 'num_followers', 'num_likes']

class AddImageSerializer(ModelSerializer):
    class Meta:
        model = Images
        fields = ['restaurant','image']

class GetImageSerializer(ModelSerializer):
    class Meta:
        model = Images
        fields = ['id','image']

class RestaurantSearchSerializer(ModelSerializer):
    class Meta:
        model = Restaurant
        fields = ['id','name']

class LikedRestaurantSerializer(ModelSerializer):
    class Meta:
        model = Restaurant_Like
        fields = ['id', 'user', 'restaurant']
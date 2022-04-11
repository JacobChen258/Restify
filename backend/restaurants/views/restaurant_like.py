from tracemalloc import get_object_traceback
from rest_framework.generics import get_object_or_404
from restaurants.serializers import LikedRestaurantSerializer
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from restaurants.models import Restaurant, Restaurant_Like
from notifications.serializers import NotificationsSerializer

@api_view(['POST','DELETE'])
@permission_classes((IsAuthenticated, ))
def liked_restaurant(request):
    if request.method=="POST":
        data = request.data.copy()
        
        try:
            data['restaurant'] = request.restaurant.id
        except Restaurant_Like.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = LikedRestaurantSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            restaurant = get_object_or_404(Restaurant,id = data['restaurant'])
            owner = restaurant.owner
            notif_data = {
                'viewer' : owner.id,
                'content': f"A user liked your restaurant"
            }
            notif_serializer = NotificationsSerializer(data=notif_data)
            notif_serializer.is_valid(raise_exception=True)
            notif_serializer.save()
            restaurant.num_likes += 1
            restaurant.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)   
    elif request.method ==  "DELETE":
        restaurant = get_object_or_404(Restaurant,id = request.data['restaurant'])
        liked_restaurant = get_object_or_404(Restaurant_Like,restaurant = restaurant,user=request.user)
        liked_restaurant.delete()
        restaurant.num_likes -= 1
        restaurant.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

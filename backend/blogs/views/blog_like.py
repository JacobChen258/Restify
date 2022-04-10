from blogs.serializers.blog_like import LikedBlogSerializer
from blogs.models import Blog_Likes
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from restaurants.models import Restaurant
from notifications.serializers import NotificationsSerializer
@api_view(['POST','DELETE'])
@permission_classes((IsAuthenticated, ))
def liked_blog(request):
    if request.method=="POST":
        data = request.data.copy()
        
        try:
            data['restaurant'] = request.restaurant.id
        except Blog_Likes.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        serializer = LikedBlogSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            owner = Restaurant.objects.get(id=data['restaurant']).owner
            notif_data = {
                'viewer' : owner.id,
                'content': f"A user liked your blog \"{data['title']}\""
            }
            notif_serializer = NotificationsSerializer(data=notif_data)
            notif_serializer.is_valid(raise_exception=True)
            notif_serializer.save()
            return Response(serializer.data, status=status.http.HTTP_201_CREATED)   
    elif request.method == 'DELETE':
        try:
            liked_blog = Blog_Likes.get(request.id)

        except Blog_Likes.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

        liked_blog.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    return Response(serializer.errors, status=status.HTTP_405_METHOD_NOT_ALLOWED)

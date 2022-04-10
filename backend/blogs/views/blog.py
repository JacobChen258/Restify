from django.shortcuts import get_object_or_404
from blogs.serializers.blog import BlogSerializer
from restaurants.models import Restaurant
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import DestroyAPIView
from rest_framework.exceptions import PermissionDenied
from blogs.models import Blog
from rest_framework.generics import RetrieveAPIView

class Blog(DestroyAPIView,RetrieveAPIView):
    serializer_class = BlogSerializer
    permission_classes = [IsAuthenticated,]

    def get_object(self, request, *args, **kwargs):
        blog = get_object_or_404(Blog, id=self.kwargs["blog_id"])
        return blog

    def delete(self, request, *args, **kwargs):
        restaurant = get_object_or_404(Restaurant,owner = self.request.user.id)
        blog = get_object_or_404(Blog, id=self.kwargs['blog_id'])
        if blog.restaurant == restaurant.id:
            self.perform_destroy(blog)
            return Response(status=status.HTTP_204_NO_CONTENT)
        raise PermissionDenied

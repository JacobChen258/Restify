from comments.models import Comment
from rest_framework.serializers import ModelSerializer

class AddCommentSerializer(ModelSerializer):

    class Meta:
        model = Comment
        fields = ["user","restaurant","content"]


class RestaurantCommentSerializer(ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id','content']
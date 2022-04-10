from django.db import models
from restaurants.models import Restaurant
from django.db.models.deletion import CASCADE
from accounts.models import User
# Create your models here.
class Blog(models.Model):
    title = models.CharField(max_length=20,null=False, blank=False)
    creation_time = models.DateTimeField(auto_now_add=True)
    content = models.TextField(max_length=500)
    restaurant = models.ForeignKey(to=Restaurant, on_delete=CASCADE,null=False, blank=False)
    num_likes = models.IntegerField(default=0)

    def __str__(self):
        return self.title

class Blog_Likes(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.DO_NOTHING,null=False, blank=False)
    blog = models.ForeignKey(to=Blog, on_delete=models.CASCADE,null=False, blank=False)
    def __str__(self):
        return self.user.username + "_"+self.blog.title

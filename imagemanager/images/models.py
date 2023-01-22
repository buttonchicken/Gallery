from django.db import models
from django.contrib.auth.models import User
import uuid

# Create your models here.
def upload_to(instance, filename):
    return 'img/{filename}'.format(filename=filename)

class Image(models.Model):
    id = models.UUIDField(primary_key=True,editable=False,default=uuid.uuid4)
    uploaded_by = models.ForeignKey(User,on_delete=models.CASCADE)
    name = models.CharField(max_length=1024)
    url = models.ImageField(upload_to=upload_to, blank=True, null=True)

    def get_image_url(self):
        return request.build_absolute_uri(self.url)
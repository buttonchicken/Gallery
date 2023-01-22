from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.parsers import MultiPartParser, FormParser
from .models import *
from .serializers import *

class FetchAllImages(APIView):
    authentication_classes = [JWTAuthentication]
    def get(self,request):
        try:
            img_objs = Image.objects.filter(uploaded_by = request.user)
            serializer_data = ImageSerializer(img_objs, many=True, context={"request":request}).data
            return Response(serializer_data,status=status.HTTP_202_ACCEPTED)
        except:
            return Response({'success':False, 'message':'Please input images'}, status=status.HTTP_400_BAD_REQUEST)

class UploadImage(APIView):
    parser_classes = (MultiPartParser, )
    authentication_classes = [JWTAuthentication]
    def post(self, request):
        try:
            name = request.data['name']
            url = request.data['url']
            img_obj= Image.objects.create(url=url,uploaded_by = request.user, name = name)
            serializer_data = ImageSerializer(img_obj, context={"request":request}).data
            return Response(serializer_data,status=status.HTTP_202_ACCEPTED)
        except:
            return Response({'mesage':'invalid parameters'},status=status.HTTP_400_BAD_REQUEST)

class DeletImage(APIView):
    authentication_classes = [JWTAuthentication]
    def delete(self, request):
        try:
            id = request.data['id']
            img_obj = Image.objects.get(id=id)
            if img_obj.uploaded_by!=request.user:
                return Response({'mesage':'cannot delete image'},status=status.HTTP_400_BAD_REQUEST)
            img_obj.delete()
            return Response({'mesage':'deleted image successfully'},status=status.HTTP_202_ACCEPTED)  
        except:
            return Response({'mesage':'invalid parameters'},status=status.HTTP_400_BAD_REQUEST)
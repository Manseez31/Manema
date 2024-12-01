from django.shortcuts import render
from .models import CustomUser, Halls, Seat, ShowMovies
from .serializers import CustomUserSerializer, HallSerializer, ShowMoviesSerializer, SeatSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated 

class UserList(APIView):

    permission_classes = [AllowAny]

    def get(self, request):
        users = CustomUser.objects.all()
        serializer = CustomUserSerializer(users, many=True)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetIfAdmin(APIView):
    
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        user = CustomUser.objects.filter(username=username).first()
        if user:
            if user.is_admin:
                return Response({'is_admin': True}, status=status.HTTP_200_OK)
            else:
                return Response({'is_admin': False}, status=status.HTTP_200_OK)
        return Response({"is_admin": False}, status=status.HTTP_200_OK)
    

class HallList(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):
        if not request.user.is_admin:
            return Response({"error": "You are not an admin"}, status=status.HTTP_403_FORBIDDEN);
    
        halls = Halls.objects.all()
        serializer = HallSerializer(halls, many=True)
        return Response(serializer.data)
    
    def post(self, request):

        if not request.user.is_admin:
            return Response({"detail:", "You are not an admin." }, status=status.HTTP_403_FORBIDDEN)
        
        serializer = HallSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
            if not request.user.is_admin:
                return Response({"detail": "You are not an admin."}, status=status.HTTP_403_FORBIDDEN)

            try:
                hall = Halls.objects.get(hall_id=request.data.get('hall_id'))
            except Halls.DoesNotExist:
                return Response({"detail": "Hall not found."}, status=status.HTTP_404_NOT_FOUND)

            hall.delete()
            return Response({"detail": "Hall deleted successfully."}, status=status.HTTP_204_NO_CONTENT)



class ShowMoviesView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):
        if not request.user.is_admin:
            return Response({"detail": "You are not an admin."}, status=status.HTTP_403_FORBIDDEN)

        serializer = ShowMoviesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def get(self, request):
        shows = ShowMovies.objects.all()
        serializer = ShowMoviesSerializer(shows, many=True)
        return  Response(serializer.data, status=status.HTTP_200_OK)

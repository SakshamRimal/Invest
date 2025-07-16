from rest_framework.views import APIView 
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.http import HttpResponse
from django.contrib.auth.hashers import make_password
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

from .models import User
from .permissions import IsAdmin, IsInvestor, IsStartup  # You’ll need to define IsInvestor & IsStartup in permissions.py

# Function-based JWT-protected view
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def protected_view(request):
    return Response({"message": "You are authenticated!"})

# Class-based JWT-protected view
class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({"message": f"Hello, {request.user.username}! You are authenticated."})

# Public homepage
def home(request):
    return HttpResponse("Welcome to InvestLink!")

# Admin-only view
class AdminOnlyView(APIView):
    permission_classes = [IsAdmin]

    def get(self, request):
        return Response({"message": "Hello Admin!"})

# ========== Registration Views ==========
class InvestorRegisterView(APIView):
    def post(self, request):
        data = request.data
        user = User.objects.create(
            username=data['username'],
            password=make_password(data['password']),
            role='investor'
        )
        return Response({'message': 'Investor registered successfully'}, status=status.HTTP_201_CREATED)

class StartupRegisterView(APIView):
    def post(self, request):
        data = request.data
        user = User.objects.create(
            username=data['username'],
            password=make_password(data['password']),
            role='startup'
        )
        return Response({'message': 'Startup registered successfully'}, status=status.HTTP_201_CREATED)

# ========== Dashboard Views ==========
class InvestorDashboardView(APIView):
    permission_classes = [IsAuthenticated, IsInvestor]

    def get(self, request):
        return Response({'dashboard': 'Welcome, Investor!'})

class StartupDashboardView(APIView):
    permission_classes = [IsAuthenticated, IsStartup]

    def get(self, request):
        return Response({'dashboard': 'Welcome, Startup!'})

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token['role'] = user.role
        token['username'] = user.username
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data['role'] = self.user.role
        data['username'] = self.user.username
        return data

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

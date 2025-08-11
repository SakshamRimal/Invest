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
        try:
            user = User.objects.create(
                username=data['username'],
                password=make_password(data['password']),
                role='investor',
                first_name=data.get('firstName', ''),
                last_name=data.get('lastName', ''),
                email=data.get('email', ''),
                investment_firm=data.get('investmentFirm', ''),
                investment_range=data.get('investmentRange', ''),
                preferred_sectors=data.get('preferredSectors', ''),
                phone=data.get('phone', '')
            )
            return Response({
                'message': 'Investor registered successfully',
                'user_id': user.id
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({
                'message': f'Registration failed: {str(e)}'
            }, status=status.HTTP_400_BAD_REQUEST)

class StartupRegisterView(APIView):
    def post(self, request):
        data = request.data
        try:
            user = User.objects.create(
                username=data['username'],
                password=make_password(data['password']),
                role='startup',
                email=data.get('email', ''),
                founder_name=data.get('founderName', ''),
                startup_name=data.get('startupName', ''),
                industry_sector=data.get('industrySector', ''),
                funding_stage=data.get('fundingStage', ''),
                company_description=data.get('companyDescription', ''),
                phone=data.get('phone', '')
            )
            return Response({
                'message': 'Startup registered successfully',
                'user_id': user.id
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({
                'message': f'Registration failed: {str(e)}'
            }, status=status.HTTP_400_BAD_REQUEST)

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

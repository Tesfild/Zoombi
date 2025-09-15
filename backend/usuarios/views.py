from django.shortcuts import render
from rest_framework.generics import RetrieveUpdateAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .serializers import CustomUserSerializer, RegisterUserSerializer, LoginUserSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.exceptions import InvalidToken

# Criando o módulo para apenas usuários autenticados entrarem
class UserInfoView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = CustomUserSerializer

    def get_object(self):
        return self.request.user

# Criando ENDPOINTS de usuários
class UserRegistrationView(CreateAPIView):
    serializer_class = RegisterUserSerializer

# Criando EndPoints para o login, recebendo os dados do cadastro
class LoginView(APIView):
    def post(self, request):
        serializer = LoginUserSerializer(data=request.data)

        if serializer.is_valid():
            user = serializer.validated_data
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)

            response = Response({
                'user': CustomUserSerializer(user).data},
                                status=status.HTTP_200_OK)
            
            response.set_cookie(key='access_token',
                                value=access_token,
                                httponly=True,
                                secure=False,
                                samesite='None')
            # Botando false na segurança apenas para teste em desenvolvimento, não em produção
            response.set_cookie(key='refresh_token', 
                                value=str(refresh),
                                httponly=True,
                                secure=False,
                                samesite='None')
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        
        if refresh_token:
            try:
                refresh = RefreshToken(refresh_token)
                refresh.blacklist()
            except Exception as ex:
                return Response({'error': 'Erro de validação de Token:' + str(ex)}, status=status.HTTP_400_BAD_REQUEST)
        response = Response({'message': 'Desconectado com sucesso!'}, status=status.HTTP_200_OK)
        response.delete_cookie('access_token')
        response.delete_cookie('refresh_token')

        return response

class CookieTokenRefreshView(TokenRefreshView):
    def post(Self, request):
        refresh_token = request.COOKIES.get("refresh_token")

        if not refresh_token:
            return Response({'error':"Refresh token not provided."},status=status.HTTP_401_UNAUTHORIZED)
        try:
            refresh = RefreshToken(refresh_token)
            access_token = str(refresh.access_token)

            response = Response({'message':'Access token refreshed successfully.'}, status=status.HTTP_200_OK)
            response.set_cookie(key='access_token',
                                value=access_token,
                                httponly=True,
                                # ativar a segurança em produção
                                secure=False,
                                samesite='Strict')
            return response
        except InvalidToken:
            return response({'error':'Invalid token.'}, status=status.HTTP_401_UNAUTHORIZED)
from django.shortcuts import render
from rest_framework.generics import RetrieveUpdateAPIView, CreateAPIView
from rest_framework.permissions import IsAuthenticated
from .serializers import CustomUserSerializer, RegisterUserSerializer

# Criando o módulo para apenas usuários autenticados entrarem
class UserInfoView(RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated, )
    serializer_class = CustomUserSerializer

    def get_object(self):
        return self.request.user

# Criando ENDPOINTS de usuários
class UserRegistrationView(CreateAPIView):
    serializer_class = RegisterUserSerializer
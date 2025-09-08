from rest_framework.serializers import ModelSerializer, Serializer
from .models import CustomUser
from rest_framework import serializers
from django.contrib.auth import authenticate

# Passando os campos a serem serializados na API rest
class CustomUserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'username')

class RegisterUserSerializer(ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email', 'username', 'password')
        extra_kwargs = {'password': {'write_only':True}}

    # Método para validar os dados
    def create(self, validated_data):
        user = CustomUser.objects.create_user(**validated_data)
        return user
    
# Normalizando os dados para que fiquem no formato correto
class LoginUserSerializer(Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True)

    # Autenticando os dados dos usuários armazenados no banco de dados
    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        else:
            raise serializers.ValidationError("Credenciais incorretas.")

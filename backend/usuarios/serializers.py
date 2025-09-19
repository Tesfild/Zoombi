from rest_framework.serializers import ModelSerializer, Serializer
from .models import CustomUser, Profile
from rest_framework import serializers
from django.contrib.auth import authenticate
from django.contrib.auth.models import User


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

class ProfileSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source="user.first_name", required=False)
    last_name = serializers.CharField(source="user.last_name", required=False)

    class Meta:
        model = Profile
        fields = ["first_name", "last_name", "avatar"]

    def update(self, instance, validated_data):
        user_data = validated_data.pop("user", {})
        if "first_name" in user_data:
            instance.user.first_name = user_data["first_name"]
        if "last_name" in user_data:
            instance.user.last_name = user_data["last_name"]
        instance.user.save()
        return super().update(instance, validated_data)
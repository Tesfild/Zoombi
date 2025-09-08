from rest_framework.serializers import ModelSerializer
from .models import CustomUser

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
        user = CustomUser.objects.create(**validated_data)
        return user
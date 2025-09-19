from django.db import models
from django.contrib.auth.models import AbstractUser, User
from .gerencia import CustomUserManager
from django.conf import settings

# Definindo um usuário customizado, para autenticar com e-mail
class CustomUser(AbstractUser):
    USERNAME_FIELD = 'email'
    # garante que o e-mail seja de posse única
    email = models.EmailField(unique=True)
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

# Definindo a classe Perfil para a classe User

class Profile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,  
        on_delete=models.CASCADE,
        related_name="profile"
    )
    avatar = models.ImageField(upload_to="avatars/", blank=True, null=True)

    def __str__(self):
        return f"Perfil de {self.user.email}"
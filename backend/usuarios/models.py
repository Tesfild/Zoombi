from django.db import models
from django.contrib.auth.models import AbstractUser
from .gerencia import CustomUserManager

# Definindo um usuário customizado, para autenticar com e-mail
class CustomUser(AbstractUser):
    USERNAME_FIELD = 'email'
    # garante que o e-mail seja de posse única
    email = models.EmailField(unique=True)
    REQUIRED_FIELDS = []

    objects = CustomUserManager()
from django.contrib import admin
from .models import CustomUser

# Importando o usuário customizado
@admin.register(CustomUser)
class CustomUserAdmin(admin.ModelAdmin):
    pass


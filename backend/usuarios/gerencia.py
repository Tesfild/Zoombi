from django.contrib.auth.models import BaseUserManager

# Determinando as opções customizadas de usuários
class CustomUserManager(BaseUserManager):
    # Criando o usuário
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("E-mail é requerido.")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        # Salvando no banco de dados
        user.save()
        return user
    
    # Criando o administrador
    def create_superuser(self, email, password=None, **extra_fields):
        # Dando permissão para o administrador acessar o site admin
        extra_fields.setdefault('is_staff', True)
        # Definindo como admin
        extra_fields.setdefault('is_superuser', True)

        if not extra_fields.get('is_staff'):
            raise ValueError("Admin não possui permissões de acesso.")
        if not extra_fields.get('is_superuser'):
            raise ValueError("Usuário não é Administrador.")
        return self.create_user(email, password, **extra_fields)

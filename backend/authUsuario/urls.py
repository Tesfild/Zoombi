from django.contrib import admin
from django.urls import path, include

# Adicionando a comunicação usuários -> API
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/usuarios/', include('usuarios.urls'))
]

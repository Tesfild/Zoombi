from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static


# Adicionando a comunicação usuários -> API
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/usuarios/', include('usuarios.urls')),
] 

if settings.DEBUG:  # só serve arquivos de mídia em modo debug
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

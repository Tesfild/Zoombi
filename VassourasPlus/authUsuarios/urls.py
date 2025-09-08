from django.contrib import admin
from django.urls import path, include
from . import views

urlpatterns = [
    path('', views.telaInicial, name="telaInicial"),
    path('cadastro', views.cadastro, name="cadastro"),
    path('login', views.login, name="login"),
    path('desconectar', views.desconectar, name="desconectar"),

]

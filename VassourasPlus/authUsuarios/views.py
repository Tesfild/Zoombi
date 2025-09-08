from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib import messages

def telaInicial(request):
    return render(request, "autenticacao/index.html")

def cadastro(request):

    if request.method == "POST":
        primeiroNome = request.POST.get('primeiroNome')
        sobrenome = request.POST.get('sobrenome')
        email = request.POST.get('email')
        senha = request.POST.get('senha')
        confirmarSenha = request.POST.get('confirmarSenha')

        if User.objects.filter(username=email).exists():
            messages.error(request, "Já existe um usuário com esse e-mail!")
            return redirect('cadastro')


        usuario = User.objects.create_user(username=email, email=email, password=senha)
        usuario.first_name = primeiroNome
        usuario.last_name = sobrenome
             
        usuario.save()

        messages.success(request, "Cadastro concluído com sucesso!")

        return redirect('login')

    return render(request, "autenticacao/cadastro.html")

def login(request):
    return render(request, "autenticacao/login.html")

def desconectar(request):
    pass
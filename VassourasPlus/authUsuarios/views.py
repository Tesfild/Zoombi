from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, logout, login as auth_login
from main import settings
from django.core.mail import send_mail

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
        
        if senha != confirmarSenha:
            messages.error(request, "Senhas não são iguais")
        

        usuario = User.objects.create_user(username=email, email=email, password=senha)
        usuario.first_name = primeiroNome
        usuario.last_name = sobrenome
             
        usuario.save()

        messages.success(request, "Cadastro concluído com sucesso! Te enviamos um e-mail de confirmação ;)")

        objeto = "Boas-vindas ao Vassouras+"
        message = "Olá, " + usuario.first_name + "! \n" + "Bem vindo ao Vassouras+! \n Agradecemos por visitar o nosso site. Por favor, confirme o seu email para ativar a sua conta."
        from_email = settings.EMAIL_HOST_USER
        to_list = [usuario.email]
        send_mail(objeto, message, from_email, to_list, fail_silently=True)

        return redirect('login')

    return render(request, "autenticacao/cadastro.html")

def login(request):

    if request.method == "POST":

        email = request.POST.get('email')
        senha = request.POST.get('senha')

        usuario = authenticate(username=email, password=senha)

        if usuario is not None:
            auth_login(request, usuario)
            primeiroNome = usuario.first_name
            return render(request, 'autenticacao/index.html', {'primeiroNome': primeiroNome})
        else:
            messages.error(request, "Credenciais erradas.")
            return redirect('telaInicial')


    return render(request, "autenticacao/login.html")

def desconectar(request):
    logout(request)
    messages.success(request, "Desconectado com sucesso.")
    return redirect('telaInicial')
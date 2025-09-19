from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Profile, CustomUser

@receiver(post_save, sender=CustomUser)  # toda vez que um User for salvo
def create_or_update_user_profile(sender, instance, created, **kwargs):
    if created:  # se o usuário acabou de ser criado
        Profile.objects.create(user=instance)
    else:  # se já existia, só garante que o perfil será salvo
        if hasattr(instance, 'profile'):
            instance.profile.save()
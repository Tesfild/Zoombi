from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import AuthenticationFailed

# Autenticação por cookies JWT
class CookieJWTAuthentication(JWTAuthentication):
        def authenticate(self, request):
                token = request.COOKIES.get('access_token')

                if not token:
                        return None
                try:
                    validated_token = self.get_validated_token(token)
                except AuthenticationFailed as ex:
                       raise AuthenticationFailed(f"Validação de token falha. {str(ex)}")
                try:
                    user=self.get_user(validated_token)
                    return user, validated_token
                except AuthenticationFailed as ex:
                       raise AuthenticationFailed(f"Falha ao encontrar o usuário. {str(ex)}")
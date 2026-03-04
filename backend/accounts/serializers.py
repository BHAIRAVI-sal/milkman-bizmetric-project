from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Wallet
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    role = serializers.SerializerMethodField()

    class Meta:
        model = User
        fields = ['id','username','email','role']

    def get_role(self, obj):
        profile = getattr(obj, "profile", None)
        return getattr(profile, "role", None)

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username','email','password']
        extra_kwargs = {'password':{'write_only':True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Wallet.objects.create(user=user)
        return user

class RoleTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        profile = getattr(user, "profile", None)
        token["role"] = getattr(profile, "role", None)
        token["username"] = user.username
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        profile = getattr(self.user, "profile", None)
        data["role"] = getattr(profile, "role", None)
        data["username"] = self.user.username
        data["user_id"] = self.user.id
        return data
from rest_framework import serializers
from apiapp.models import MyUser, Candidate, List
from django.core.exceptions import ValidationError


class UserSerializer(serializers.ModelSerializer):
    user_uuid = serializers.UUIDField(read_only=True, source='uuid')
    email_address = serializers.EmailField(source='email', write_only=True)

    class Meta:
        model = MyUser
        fields = ('user_uuid', 'first_name', 'last_name', 'email_address',
                  'password')
        extra_kwargs = {'password': {'write_only': True}}

    def validate_email_address(self, value):
        queryset = MyUser.objects.filter(email=value)
        if queryset.exists():
            raise ValidationError('This email address is already in use \
                    by another account.')

        return value


class CandidateSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Candidate
        fields = ('user', 'rank', 'current_company', 'current_title')


class ListSerializer(serializers.ModelSerializer):
    title = serializers.CharField()
    description = serializers.CharField()

    class Meta:
        model = List
        fields = ('title', 'description')

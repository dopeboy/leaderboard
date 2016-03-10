from rest_framework import serializers
from apiapp.models import MyUser, Candidate, List, CandidateDistinction
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
    distinctions = serializers.SerializerMethodField()

    class Meta:
        model = Candidate
        fields = ('user', 'score', 'current_company', 'current_title',
                  'distinctions')

    def get_distinctions(self, obj):
        distinction_data = []

        for d in obj.distinctions.all():
            x = {"text": d.text, "quantity":
                 CandidateDistinction.objects.get(
                     candidate=obj, distinction=d).quantity}
            distinction_data.append(x)

        return distinction_data


class ListSerializer(serializers.ModelSerializer):
    title = serializers.CharField()
    description = serializers.CharField()

    class Meta:
        model = List
        fields = ('title', 'description')

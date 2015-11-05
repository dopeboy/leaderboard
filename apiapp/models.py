from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractBaseUser
import uuid
from json import JSONEncoder
from uuid import UUID


class MyUserManager(BaseUserManager):
    def create_user(self, email, first_name, last_name, password=None):
        if not email:
            raise ValueError('Users must have an email address')

        if not first_name:
            raise ValueError('Users must have a first name')

        if not last_name:
            raise ValueError('Users must have a last name')

        user = self.model(
            email=self.normalize_email(email),
        )

        user.first_name = first_name
        user.last_name = last_name

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password, first_name, last_name):
        """
        Creates and saves a superuser with the given email,
        password.
        """
        user = self.create_user(email, password=password,
                                first_name=first_name, last_name=last_name)
        user.is_admin = True
        user.save(using=self._db)
        return user


class MyUser(AbstractBaseUser):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4,
                            editable=False)
    first_name = models.CharField(max_length=32)
    last_name = models.CharField(max_length=32)

    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = MyUserManager()

    address = models.CharField(max_length=128, null=True)
    state = models.CharField(max_length=64, null=True)
    city = models.CharField(max_length=64, null=True)
    country = models.CharField(max_length=64, null=True)
    latitude = models.DecimalField(max_digits=10, decimal_places=3, null=True)
    longitude = models.DecimalField(max_digits=10, decimal_places=3, null=True)

    # profile_picture = models.CharField(max_length=128, null=True)

    join_date = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    def get_full_name(self):
        # The user is identified by their email address
        return self.first_name + " " + self.last_name

    def get_short_name(self):
        # The user is identified by their email address
        return self.first_name

    def __str__(self):              # __unicode__ on Python 2
        return self.email


class Candidate(models.Model):
    user = models.OneToOneField(MyUser, unique=True)

JSONEncoder_olddefault = JSONEncoder.default


def JSONEncoder_newdefault(self, o):
    if isinstance(o, UUID):
        return str(o)
    return JSONEncoder_olddefault(self, o)
JSONEncoder.default = JSONEncoder_newdefault

# Create your models here.
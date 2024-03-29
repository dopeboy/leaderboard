from django.db import models
from django.contrib.auth.models import \
    BaseUserManager, AbstractBaseUser, PermissionsMixin
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
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class MyUser(AbstractBaseUser, PermissionsMixin):
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
    is_staff = models.BooleanField(default=False)

    objects = MyUserManager()

    address = models.CharField(max_length=128, blank=True)
    state = models.CharField(max_length=64, blank=True)
    city = models.CharField(max_length=64, blank=True)
    country = models.CharField(max_length=64, blank=True)

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


class List(models.Model):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4,
                            editable=False)
    name = models.CharField(max_length=32)
    title = models.CharField(max_length=256)
    description = models.CharField(max_length=256)
    location = models.CharField(max_length=32)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name + ' (' + self.location + ')'


class Distinction(models.Model):
    list = models.ForeignKey(List)
    text = models.CharField(max_length=320)

    def __str__(self):
        return self.text + ' (' + str(self.list) + ' )'


class Candidate(models.Model):
    user = models.OneToOneField(MyUser, unique=True)
    score = models.DecimalField(max_digits=10, decimal_places=7, null=True)
    current_company = models.CharField(max_length=128, blank=True)
    current_title = models.CharField(max_length=256, blank=True)
    list = models.ForeignKey(List)
    distinctions = models.ManyToManyField('Distinction',
                                          through='CandidateDistinction')
    linkedin_url = models.CharField(max_length=256, blank=True, null=True)
    visible = models.BooleanField(default=True)

    preclaim_view_seen = models.DateTimeField(blank=True, null=True)
    password_view_seen_timestamp = models.DateTimeField(blank=True, null=True)
    password_submitted_timestamp = models.DateTimeField(blank=True, null=True)
    accomplishments_submitted_timestamp =\
        models.DateTimeField(blank=True, null=True)

    STATUS = (
        ('SL', 'Maybe'),
        ('JL', 'Yes'),
        ('NI', 'No')
    )

    status = models.CharField(max_length=2, choices=STATUS, blank=True)
    accomplishments = models.TextField(blank=True, null=True)

    class Meta:
        ordering = ['score']

    def __str__(self):
        return self.user.first_name + ' ' + self.user.last_name + ', ' \
            + self.current_company + ', ' + self.current_title


class CandidateDistinction(models.Model):
    candidate = models.ForeignKey(Candidate)
    distinction = models.ForeignKey(Distinction)
    quantity = models.IntegerField()

JSONEncoder_olddefault = JSONEncoder.default


def JSONEncoder_newdefault(self, o):
    if isinstance(o, UUID):
        return str(o)
    return JSONEncoder_olddefault(self, o)
JSONEncoder.default = JSONEncoder_newdefault

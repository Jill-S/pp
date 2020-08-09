from django.contrib.auth.models import (AbstractBaseUser, BaseUserManager,
                                        Group, PermissionsMixin)
from django.core.mail import send_mail
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _

from jsonfield import JSONField


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, first_name, last_name, **extra_fields):
        if not email:
            raise ValueError("The given email must be set")
        email = self.normalize_email(email)
        first_name = first_name.title()
        last_name = last_name.title()
        user = self.model(email=email, first_name=first_name,
                          last_name=last_name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password, first_name, last_name, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, password, first_name, last_name, **extra_fields)

    def create_superuser(self, email, password, first_name, last_name, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True")
        return self._create_user(email, password, first_name, last_name, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_("email"), max_length=254, unique=True)
    first_name = models.CharField(_("first name"), max_length=50)
    last_name = models.CharField(
        _("last name"), max_length=50, blank=True, null=True)
    profile_photo = models.ImageField(
        _("profile photo"), upload_to="profile_photos/", blank=True, null=True)
    is_staff = models.BooleanField(_("is staff"), default=False)
    is_active = models.BooleanField(_("is active"), default=True)
    date_joined = models.DateTimeField(
        _("date joined"), default=timezone.now)
    objects = UserManager()
    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ("first_name", "last_name", "profile_photo", )

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def email_user(self, subject, message, from_email=None, **kwargs):
        send_mail(subject, message, from_email, [self.email], **kwargs)


branches = (("IT", "Information Technology"),
            ("CS", "Computer Science"),
            ("Mech", "Mechanical"),
            ("EXTC", "Electronics And Telecommunication"),
            ("ETRX", "Electronics"),)


class Student(User):
    roll_number = models.IntegerField(_("roll number"), unique=True)
    branch = models.CharField(
        _("branch"), max_length=4, choices=branches, default="IT")
    team = models.ForeignKey("api.Team", verbose_name=_(
        "team"), on_delete=models.SET_NULL, blank=True, null=True)
    project = models.OneToOneField("api.Project", verbose_name=_(
        "project"), on_delete=models.SET_NULL, blank=True, null=True)


thrust_areas = (("NS", "Network and Security"),
                ("AD", "Application Development"),
                ("IM", "Information Management"),
                ("KS", "Knowledge-based systems"),)


class Guide(User):
    initials = models.CharField(_("initials"), max_length=50, unique=True)
    area_of_interest = JSONField()
    # check before saving
    thrust_area = JSONField()


class Assistant(User):
    pass


class Coordinator(User):
    pass


class File(models.Model):
    assignment = models.ForeignKey("api.Assignment", verbose_name=_(
        "assignment"), on_delete=models.CASCADE)
    file = models.FileField(_("file"), upload_to="user_files/")


class Assignment(models.Model):
    coordinator = models.ForeignKey(
        "api.Coordinator", verbose_name=_("coordinator"), on_delete=models.DO_NOTHING)
    due = models.DateTimeField(
        _("due on"), blank=True, null=True)
    posted = models.DateTimeField(
        _("posted on"), auto_now=True)
    description = models.TextField(_("description"), blank=True, null=True)
    weightage = models.IntegerField(_("weightage"), blank=True, default=0)
    title = models.CharField(_("title"), max_length=256)


domains = (
    ("CS", "Cyber Security (Forensics, Blockchain Technology, Biometrics Security, Cryptographic Techniques)"),
    ("IP", "Image Processing (Computer Vision)"),
    ("AI", "Artifical Intelligence (Machine Learning, Natural Language Processing, Robotics)"),
    ("CN", "Computer Networking"),
    ("BD", "Big Data Processing"),
    ("EHIA", "Embedded and Hardware Integrated Applications (IOT)"),
    ("ARVR", "Augmented Reality and Virtual Reality"),
    ("GIS", "GIS"),
    ("CLOUD", "Cloud Computing (High Performance Computing)"),
    ("SP", "System Programming (Compiler construction, OS, Device drivers)"),
    ("QC", "Quantum Computing"),
    ("STA", "Software Testing Automation"),
    ("OTHER", "Other"),
)
category = (("IN", "Internal"),
            ("EX", "External"),
            ("ID", "Inter-disciplinary"),)


class Project(models.Model):
    title = models.CharField(_("title"), max_length=256)
    domain = models.CharField(
        _("domain"), max_length=500, choices=domains, default="AI")
    category = models.CharField(
        _("category"), max_length=50, choices=category, default="IN")
    explanatory_field = models.TextField(
        _("explanatory field"), blank=True, null=True)
    description = models.TextField(_("description"))
    approval = models.OneToOneField(
        "api.Approval", verbose_name=_("approval"), on_delete=models.CASCADE)


class Comment(models.Model):
    by = models.EmailField(_("by"), max_length=254)
    posted = models.DateTimeField(_("posted"), auto_now=True)
    content = models.TextField(_("content"))


approval_status = (("P", "Pending"),
                   ("A", "Accepted"),
                   ("R", "Rejected"),)
approval_category = (("P", "Project"),
                     ("CL", "Change leader"),
                     ("RS", "Remove student"),)


class Approval(models.Model):
    status = models.CharField(
        _("status"), max_length=4, choices=approval_status, default="P")
    category = models.CharField(
        _("category"), max_length=50, choices=approval_category, default="P")
    created = models.DateTimeField(_("created"), auto_now=True)
    last_modified = models.DateTimeField(
        _("last modified"), auto_now_add=True, blank=True, null=True)


class Team(models.Model):
    leader = models.OneToOneField("api.Student", verbose_name=_(
        "leader"), null=True, on_delete=models.SET_NULL,  related_name='+')
    approval = models.ForeignKey("api.Approval", verbose_name=_(
        "approval"), on_delete=models.DO_NOTHING, blank=True, null=True)
    guide = models.OneToOneField("api.Guide", verbose_name=_(
        "guide"), on_delete=models.SET_NULL, blank=True, null=True)


class Grade(models.Model):
    students = models.ForeignKey("api.Student", verbose_name=_(
        "students"), on_delete=models.DO_NOTHING)
    assignment = models.OneToOneField(
        "api.Assignment", verbose_name=_("assignment"), on_delete=models.CASCADE)
    marks_obtained = models.IntegerField(
        _("marks obtained"), blank=True, default=0)
    guide = models.OneToOneField("api.Guide", verbose_name=_(
        "guide"), on_delete=models.DO_NOTHING)
    graded_on = models.DateTimeField(
        _("graded on"), auto_now_add=True)

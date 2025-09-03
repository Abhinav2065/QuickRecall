from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save # Import post_save
from django.dispatch import receiver # Import receiver

class UserProfile(models.Model):
    """
    Extends the built-in User model
    """
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.username

# Signal to create UserProfile when a User is created
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    if hasattr(instance, 'userprofile'):
        instance.userprofile.save()



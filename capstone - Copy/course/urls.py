from django.urls import path
from . import views


urlpatterns = [
    path("", views.index, name="index"),
    path("login_view", views.login_view, name="login_view"),
    path("logout_view", views.logout_view, name="logout_view"),
    path("register", views.register, name="register"),
    path("update_progress", views.update_progress, name="update_progress"),
    path("get_progress", views.get_progress, name="get_progress"),
    path("reviews", views.reviews, name="reviews"),

]


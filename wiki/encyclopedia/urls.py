from django.urls import path

from . import views
app_name = "encyclopedia"
urlpatterns = [
    path("", views.index, name="index"),
    path("wiki/<str:title>/", views.entry_page, name="entry_page"),
    path("search/", views.search, name="search"),
    path("create_page/", views.create_page, name="create_page"),
    path("edit_page/<str:title>/", views.edit_page, name="edit_page"),
    path("update_page", views.update_page, name="update_page"),
    path("random_page", views.random_page, name="random_page"),
]
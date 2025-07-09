from django.contrib import admin
from django.urls import path, include
from . import views  # Make sure views.home is defined here

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/accounts/', include('accounts.urls')),
    path('', views.home, name='home'),  # Homepage URL
]

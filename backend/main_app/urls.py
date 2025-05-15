from django.urls import path
from .views import ReviewCRUDView

urlpatterns = [
    path('reviews/', ReviewCRUDView.as_view(), name='review-crud'),
]

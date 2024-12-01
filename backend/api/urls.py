from django.urls import path
from .views import UserList, GetIfAdmin, HallList, ShowMoviesView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('', UserList.as_view()),
    path('token/', TokenObtainPairView.as_view()),
    path('token/refresh/', TokenRefreshView.as_view()),
    path('verifyAdmin/', GetIfAdmin.as_view()),
    path('halls/', HallList.as_view()),
    path('showMovies/', ShowMoviesView.as_view()),
]

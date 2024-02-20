from django.urls import path, include
from rest_framework import routers
from api.viewsets import ProductViewSet

router = routers.SimpleRouter()
router.register(r'produtos', ProductViewSet, basename="produtos")

app_name = "product"

urlpatterns = [
    path("api/", include(router.urls)),
]

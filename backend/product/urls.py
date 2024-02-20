from django.urls import path, include
from rest_framework import routers
from product.api.viewsets import ProdutoViewSet

router = routers.SimpleRouter()
router.register(r'produtos', ProdutoViewSet, basename="produtos")

app_name = "product"

urlpatterns = [
    path("api/", include(router.urls)),
]

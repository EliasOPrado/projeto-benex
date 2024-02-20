from rest_framework import viewsets
from product.models import Produto
from .serializers import ProdutoSerializer

class ProdutoViewSet(viewsets.ModelViewSet):
    serializer_class = ProdutoSerializer
    queryset = Produto.objects.all()
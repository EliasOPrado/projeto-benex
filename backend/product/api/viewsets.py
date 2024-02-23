from rest_framework import viewsets
from product.models import Produto
from .serializers import ProdutoSerializer

class ProdutoViewSet(viewsets.ModelViewSet):
    """
    Viewset for Product entity.

    Modelviewset inheritance: 
    - create(), 
    - retrieve(), 
    - update(),
    - partial_update(), 
    - destroy()
    - list()
    """
    serializer_class = ProdutoSerializer
    queryset = Produto.objects.all()
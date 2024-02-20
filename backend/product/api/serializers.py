from rest_framework import serializers
from product.models import Produto

class ProdutoSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = Produto
        fields = ["id", "nome", "descricao", "valor"]
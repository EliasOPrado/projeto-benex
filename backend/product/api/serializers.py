from rest_framework import serializers
from product.models import Produto

class ProdutoSerializer(serializers.ModelSerializer):
    """
    Serializer for Produto entity.

    Fields:
    - id: Product identificator
    - nome: Product name
    - descricao: Product description
    - valor: Product value
    """
    class Meta:
        model = Produto
        fields = ["id", "nome", "descricao", "valor"]
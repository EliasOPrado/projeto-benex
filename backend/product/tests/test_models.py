from django.test import TestCase
from product.models import Produto


class TestProduto(TestCase):
    def setUp(self):
        self.produto_1 = Produto.objects.create(
            nome="Avaianas Azul", 
            descricao="Sandalia Avaianas azul", 
            valor=15.50
        )
        self.produto_2 = Produto.objects.create(
            nome="Avaianas Vermelha",
            descricao="Sandalia Avaianas vermelha",
            valor=15.40,
        )
        self.produto_3 = Produto.objects.create(
            nome="Avaianas Preta", 
            descricao="Sandalia Avaianas preta", 
            valor=15.30
        )
        self.produto_4 = Produto.objects.create(
            nome="Avaianas Branca", 
            descricao="Sandalia Avaianas branca", 
            valor=15.20
        )

    def test_check_produto_exist(self):
        """Check if produto exits"""
        produto = Produto.objects.first()
        self.assertTrue(produto)

    def test_if_produto_attributes_correctiveness(self):
        """Test if product attributes are correct"""
        self.assertEqual(type(self.produto_1.nome), str)
        self.assertEqual(type(self.produto_1.descricao), str)
        self.assertEqual(type(self.produto_1.valor), float)

    def test_values_created_into_produto_table(self):
        """Test if values from instance created are inserted into db"""
        product_quantity = Produto.objects.all().count()
        self.assertEqual(product_quantity, 4)
        self.assertEqual(self.produto_1.valor, 15.50)
        self.assertEqual(self.produto_1.nome, "Avaianas Azul")
        self.assertEqual(self.produto_1.descricao, "Sandalia Avaianas azul")
        self.assertEqual(self.produto_2.valor, 15.40)
        self.assertEqual(self.produto_2.nome, "Avaianas Vermelha")
        self.assertEqual(self.produto_2.descricao, "Sandalia Avaianas vermelha")
        self.assertEqual(self.produto_3.valor, 15.30)
        self.assertEqual(self.produto_3.nome, "Avaianas Preta")
        self.assertEqual(self.produto_3.descricao, "Sandalia Avaianas preta")
        self.assertEqual(self.produto_4.valor, 15.20)
        self.assertEqual(self.produto_4.nome, "Avaianas Branca")
        self.assertEqual(self.produto_4.descricao, "Sandalia Avaianas branca")

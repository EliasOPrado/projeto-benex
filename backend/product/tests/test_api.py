from rest_framework import status
from django.urls import reverse

from rest_framework.test import APITestCase

from product.models import Produto


class TestAPI(APITestCase):
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

        self.new_produto_data = {
            "nome":"Avaianas Rosa Brazil", 
            "descricao":"Sandalia Avaianas Rosa com simbolo do Brasil",
            "valor":25.50
        }

        self.update_produto_data = {
            "id": self.produto_1.id,
            "nome": "Avaianas Cinza",
            "descricao":"Sandalia Avaianas cinza",
            "valor": 15.75,
        }

        self.url_produtos_list = reverse(
            "product:produtos-list"
        )
        self.url_produto_detail = reverse(
            "product:produtos-detail", 
            kwargs={"pk": self.produto_1.pk}
        )

    def test_get_produtos(self):
        """Test GET method for produtos endpoint"""
        response = self.client.get(self.url_produtos_list, format="json")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_produto(self):
        """Test POST method for produtos endpoint"""
        response = self.client.post(
            self.url_produtos_list, self.new_produto_data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_update_produto(self):
        """Test PUT method for produto endpoint"""
        response = self.client.put(
            self.url_produto_detail, self.update_produto_data, format="json"
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_produto(self):
        """Test DELETE method for produto endpoint"""
        response = self.client.delete(self.url_produto_detail, format="json")
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
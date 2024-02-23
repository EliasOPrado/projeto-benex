# Projeto Produto - Benex

### Configuração
Para rodar o projeto crie um arquivo `.env`no repositorio `backend/` e adicione os seguintes parametros:

```
POSTGRES_DB=benex_project_db
POSTGRES_USER=bnex_project_user
POSTGRES_PASSWORD=bnex_project_password
SECRET_KEY=mysecretkey123
```
### Rodando o projeto
Ao fazer o procedimento de configuração rode o seguinte comando para fazer o projeto funcionar:
```
docker compose up --build
```
### Links para acesso:

Backend: `http://127.0.0.1:8000/api/produtos/`

Backend-documentation: `http://127.0.0.1:8000/swagger/`

Frontend: `http://localhost:5173/`
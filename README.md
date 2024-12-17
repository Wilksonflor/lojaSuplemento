# 🛒 API de Gerenciamento de Estoque - Loja de Suplementos

## 📋 Descrição do Projeto

Esta é uma API desenvolvida em **Node.js** com **Express** e **PostgreSQL** que gerencia produtos e suas movimentações (entrada e saída) em uma loja de suplementos. A API fornece endpoints para criar, listar, atualizar e excluir produtos, além de registrar movimentações no estoque.

---

## 🚀 Funcionalidades

1. **Gerenciamento de Produtos**:

   - Criar um produto.
   - Listar todos os produtos.
   - Atualizar um produto.
   - Excluir um produto.

2. **Movimentação de Estoque**:
   - Registrar movimentações (entrada e saída).
   - Listar todas as movimentações.
   - Atualizar movimentações.

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime do JavaScript.
- **Express** - Framework para construção de APIs REST.
- **PostgreSQL** - Banco de dados relacional.
- **dotenv** - Gerenciamento de variáveis de ambiente.
- **pg** - Biblioteca de conexão com o PostgreSQL.
- **CORS** - Configuração de Cross-Origin Resource Sharing.

## 📂 Estrutura do Projeto

```bash
lojaSuplemento/
├── node_modules/
├── src/
│   ├── controllers/
│   │   └── produtos/          # Controladores de produtos
│   │   └── movimentacoes/     # Controladores de movimentações
│   ├── routes/
│   │   └── produtos.js        # Rotas de produtos
│   │   └── movimentacoes.js   # Rotas de movimentações
│   ├── models/
│   │   └── db.js              # Configuração do banco de dados
├── .env                       # Variáveis de ambiente
├── package.json               # Dependências do projeto
└── server.js                  # Ponto de entrada da aplicação
```

## ⚙️ Pré-requisitos

Antes de iniciar, certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

- Node.js
- PostgreSQL
- Git

## 📝 Configuração do Projeto

1. Clone o repositório

```bash
git clone https://github.com/Wilksonflor/EstoqueSuplementos.git
cd EstoqueSuplementos
```

2. Instale as dependências

```bash
npm install
```

3. Configure o banco de dados
   Crie um banco de dados no PostgreSQL chamado supplements.
   Crie as tabelas necessárias no banco. Exemplo do script SQL:

```sql
CREATE TABLE produtos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT,
    quantidade INTEGER NOT NULL DEFAULT 0,
    preco NUMERIC(10, 2) NOT NULL CHECK (preco >= 0),
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE movimentacoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    produto_id UUID NOT NULL REFERENCES produtos(id) ON DELETE CASCADE,
    tipo VARCHAR(10) NOT NULL CHECK (tipo IN ('ENTRADA', 'SAIDA')),
    quantidade INTEGER NOT NULL CHECK (quantidade > 0),
    data_movimentacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

3. Adicione as variáveis de ambiente no arquivo .env:

```bash
DB_USER=
DB_HOST=
DB_NAME=
DB_PASSWORD=
DB_PORT=
PORT=
```

4. Inicie o servidor

```bash
npm start
```

---

## 📡 Endpoints da API

### Produtos

| Método     | Rota                | Descrição                |
| ---------- | ------------------- | ------------------------ |
| **GET**    | `/api/produtos`     | Listar todos os produtos |
| **POST**   | `/api/produtos`     | Criar um novo produto    |
| **PUT**    | `/api/produtos/:id` | Atualizar um produto     |
| **DELETE** | `/api/produtos/:id` | Excluir um produto       |

### Movimentações

| Método   | Rota                     | Descrição                                  |
| -------- | ------------------------ | ------------------------------------------ |
| **GET**  | `/api/movimentacoes`     | Listar todas as movimentações              |
| **POST** | `/api/movimentacoes`     | Criar uma movimentação **(ENTRADA/SAIDA)** |
| **PUT**  | `/api/movimentacoes/:id` | Atualizar uma movimentação                 |

## 🔎 Exemplo de Requisição

Criar um Produto
Rota: `POST /api/produtos`

**Body:**

```json
{
  "nome": "Whey Protein",
  "descricao": "Suplemento de proteína",
  "preco": 150.0
}
```

Criar uma Movimentação
Rota: `POST /api/movimentacoes`

Body:

```json
{
  "produto_id": "b59f3b3b-ff81-4dc1-abb0-5c6b7ca39a05",
  "tipo": "ENTRADA",
  "quantidade": 10
}
```

## 🧪 Testando a API

Utilize ferramentas como **Insomnia** ou **Postman** para testar os endpoints da API.
Verifique os retornos de erro e sucesso no console.

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir
Issues ou enviar Pull Requests.

## 📜 Licença

Este projeto está sob a licença MIT.

## Autor

 [@wilksonflor](https://www.github.com/wilksonflor)

 [![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/wilksonflor/)

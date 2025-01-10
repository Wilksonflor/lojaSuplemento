# 🛒 API de Gerenciamento de Estoque - Loja de Suplementos

## 📋 Descrição do Projeto

Esta é uma API desenvolvida em **Node.js** com **Express** e **PostgreSQL** que gerencia produtos, movimentações (entrada e saída) e usuários em uma loja de suplementos. A API fornece endpoints para criar, listar, atualizar e excluir produtos, além de registrar movimentações no estoque e gerenciar usuários com autenticação e autorização.

---

## 🚀 Funcionalidades

1. **Gerenciamento de Produtos**:

   - Criar um produto.
   - Listar todos os produtos.
   - Atualizar um produto.
   - Excluir um produto.
   - Filtrar produtos por categoria, status (ativo/inativo), nome ou código.

2. **Movimentação de Estoque**:

   - Registrar movimentações (entrada e saída).
   - Listar todas as movimentações.

3. **Gerenciamento de Usuários**:
   - Criar usuários (admin ou padrão).
   - Realizar login e logout.
   - Listar e excluir usuários.
   - Controle de acesso baseado em roles (admin/usuário).

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** - Runtime do JavaScript.
- **Express** - Framework para construção de APIs REST.
- **PostgreSQL** - Banco de dados relacional.
- **dotenv** - Gerenciamento de variáveis de ambiente.
- **pg** - Biblioteca de conexão com o PostgreSQL.
- **bcryptjs** - Criptografia de senhas.
- **jsonwebtoken** - Autenticação baseada em tokens.
- **CORS** - Configuração de Cross-Origin Resource Sharing.
- **Documentação:** Swagger (disponível em `http://localhost:3000/api-docs`).

## 📂 Estrutura do Projeto

```bash
APIEstoqueSuplementos/
├── node_modules/
├── src/
│   ├── controllers/
│   │   ├── produtos/          # Controladores de produtos
│   │   ├── movimentacoes/     # Controladores de movimentações
│   │   ├── usuarios/          # Controladores de usuários
│   ├── routes/
│   │   ├── produtos.js        # Rotas de produtos
│   │   ├── movimentacoes.js   # Rotas de movimentações
│   │   ├── usuarios.js        # Rotas de usuários
│   ├── models/
│   │   ├── db.js              # Configuração do banco de dados
│   ├── middlewares/
│   │   ├── authMiddleware.js  # Middleware de autenticação
│   └── swagger/               # Configuração da documentação Swagger
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
git clone https://github.com/Wilksonflor/APIEstoqueSuplementos.git
cd APIEstoqueSuplementos
```

2. Instale as dependências

```bash
npm install
```

3. Configure o banco de dados
   Crie um banco de dados no PostgreSQL chamado `estoque_suplementos`.
   Crie as tabelas necessárias no banco. Exemplo do script SQL:

```sql
CREATE TABLE produtos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(100) NOT NULL UNIQUE,
    descricao TEXT,
    quantidade INTEGER NOT NULL DEFAULT 0,
    preco NUMERIC(10, 2) NOT NULL CHECK (preco >= 0),
    ativo BOOLEAN DEFAULT true,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE movimentacoes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    usuario_id UUID NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    tipo VARCHAR(10) NOT NULL CHECK (tipo IN ('ENTRADA', 'SAIDA')),
    quantidade INTEGER NOT NULL CHECK (quantidade > 0),
    data_movimentacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    senha TEXT NOT NULL,
    role VARCHAR(10) NOT NULL DEFAULT 'user',
    ativo BOOLEAN DEFAULT true,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

4. Adicione as variáveis de ambiente no arquivo `.env`:

```bash
DB_USER=
DB_HOST=
DB_NAME=estoque_suplementos
DB_PASSWORD=
DB_PORT=5432
JWT_SECRET=chave_secreta
PORT=3000
```

5. Inicie o servidor

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

| Método   | Rota                 | Descrição                                  |
| -------- | -------------------- | ------------------------------------------ |
| **GET**  | `/api/movimentacoes` | Listar todas as movimentações              |
| **POST** | `/api/movimentacoes` | Criar uma movimentação **(ENTRADA/SAIDA)** |

### Usuários

| Método     | Rota                   | Descrição                |
| ---------- | ---------------------- | ------------------------ |
| **POST**   | `/api/usuarios`        | Criar um novo usuário    |
| **POST**   | `/api/usuarios/login`  | Realizar login           |
| **POST**   | `/api/usuarios/logout` | Realizar logout          |
| **GET**    | `/api/usuarios`        | Listar todos os usuários |
| **DELETE** | `/api/usuarios/:id`    | Excluir um usuário       |

## 🔎 Exemplo de Requisição

### Criar um Produto

**Rota:** `POST /api/produtos`

**Body:**

```json
{
  "nome": "Whey Protein",
  "descricao": "Suplemento de proteína",
  "preco": 150.0,
  "quantidade": 10,
  "categoria": "Suplementos",
  "ativo": true
}
```

### Criar uma Movimentação

**Rota:** `POST /api/movimentacoes`

**Body:**

```json
{
  "usuario_id": "b59f3b3b-ff81-4dc1-abb0-5c6b7ca39a05",
  "tipo": "ENTRADA",
  "produtos": [
    {
      "produto_id": "f01f3b3b-ff81-4dc1-abb0-5c6b7ca39a05",
      "quantidade": 10
    }
  ]
}
```

### Criar um Usuário

**Rota:** `POST /api/usuarios`

**Body:**

```json
{
  "nome": "Admin",
  "email": "admin@example.com",
  "senha": "admin123",
  "role": "admin"
}
```

## 🧪 Testando a API

Utilize ferramentas como **Insomnia** ou **Postman** para testar os endpoints da API.

Se preferir, pode utilizar o swagger que está disponível em:

```
http://localhost:3000/api-docs).
```

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir Issues ou enviar Pull Requests.

## 📜 Licença

Este projeto está sob a licença MIT.

## Autor

[@wilksonflor](https://www.github.com/wilksonflor)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/wilksonflor/)

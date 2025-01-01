# Usar a imagem oficial do Node.js
FROM node:18-alpine

# Criar diretório de trabalho
WORKDIR /app

# Copiar os arquivos do projeto
COPY package*.json ./
COPY . .

# Instalar as dependências
RUN npm install

# Expor a porta usada pela API
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]

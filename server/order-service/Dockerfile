FROM node:14

# Cria diretório de trabalho
WORKDIR /usr/src/app

# Copia package.json e package-lock.json
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia código do aplicativo
COPY . .

# Compila o TypeScript
RUN npx tsc

# Exponha a porta 3000
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "dist/app.js"]

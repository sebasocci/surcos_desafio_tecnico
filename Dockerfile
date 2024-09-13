# Usa una imagen base de Node.js
FROM node:18

# Establece el directorio de trabajo
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json
COPY package*.json ./

# Elimina node_modules y package-lock.json si existen
#RUN rm -rf node_modules package-lock.json

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código de la aplicación
COPY . .

# Recompilar las bibliotecas nativas
RUN npm rebuild bcrypt

# Compila la aplicación
RUN npm run build

# Expone el puerto en el que correrá la aplicación
EXPOSE 3001

# Comando para iniciar la aplicación
CMD [ "npm", "start" ]

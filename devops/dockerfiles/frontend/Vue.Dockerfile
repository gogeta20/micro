# Vue.Dockerfile

# Usar la imagen oficial de Node.js
FROM node:16-alpine

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos de configuración de npm
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar todo el código fuente del frontend al contenedor
COPY . .

# Exponer el puerto para el servidor de desarrollo de Vue
EXPOSE 5173

# Comando para ejecutar el servidor de desarrollo
CMD ["npm", "run", "dev", "--", "--host"]

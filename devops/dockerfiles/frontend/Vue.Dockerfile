# Vue.Dockerfile

# Usar la imagen oficial de Node.js
#FROM node:16-alpine
FROM node:18-alpine

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar los archivos de configuración de npm desde la carpeta de Vue
COPY project/front/vue/package*.json ./

# Instalar las dependencias
RUN npm install -g vite && npm install

# Copiar todo el código fuente del frontend al contenedor
COPY project/front/vue/ .

# Exponer el puerto para el servidor de desarrollo de Vue
EXPOSE 5173

# Comando para ejecutar el servidor de desarrollo
CMD ["npm", "run", "dev"]

# Nginx.Dockerfile

FROM nginx:alpine

# Copiar el archivo de configuración de Nginx al contenedor
COPY ./conf/nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./conf/nginx/sites-available/ /etc/nginx/conf.d/

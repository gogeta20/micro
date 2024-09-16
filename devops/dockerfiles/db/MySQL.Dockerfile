# MySQL.Dockerfile

FROM mysql:8.0

# Copiar un archivo de configuración de MySQL si es necesario
COPY ./conf/mysql/my.cnf /etc/mysql/my.cnf

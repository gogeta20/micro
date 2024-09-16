# PostgreSQL.Dockerfile

FROM postgres:13

# Copiar un archivo de configuración de PostgreSQL si es necesario
COPY ./conf/postgres/postgresql.conf /etc/postgresql/postgresql.conf

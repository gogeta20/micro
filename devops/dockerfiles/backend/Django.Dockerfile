# Django.Dockerfile

# Usar la imagen oficial de Python
FROM python:3.10

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos de requisitos de Python
COPY requirements.txt .

# Instalar las dependencias
RUN pip install --no-cache-dir -r requirements.txt

# Copiar el código fuente al contenedor
COPY . .

# Exponer el puerto para el servidor de desarrollo de Django
EXPOSE 8000

# Comando para ejecutar el servidor de desarrollo de Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]

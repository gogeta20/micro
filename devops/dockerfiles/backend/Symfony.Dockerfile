# Symfony.Dockerfile

# Usar la imagen oficial de PHP con Apache
FROM php:8.1-apache

# Instalar extensiones de PHP necesarias para Symfony
RUN apt-get update && apt-get install -y \
    libicu-dev \
    libpq-dev \
    && docker-php-ext-install intl pdo pdo_mysql pdo_pgsql

# Habilitar mod_rewrite para Symfony
RUN a2enmod rewrite

# Establecer el directorio de trabajo
WORKDIR /var/www/html

# Copiar los archivos de Composer
COPY composer.json composer.lock ./

# Instalar Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Instalar dependencias de Composer
RUN composer install

# Copiar todo el código de Symfony al contenedor
COPY . .

# Ajustar permisos de la carpeta de cache y logs de Symfony
RUN chown -R www-data:www-data var

# Exponer el puerto de Apache
EXPOSE 80

# Comando para ejecutar Apache en primer plano
CMD ["apache2-foreground"]

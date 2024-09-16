FROM php:8.2.12-apache as mphp
# FROM php:8.0.0-apache
ARG DEBIAN_FRONTEND=noninteractive
RUN docker-php-ext-install mysqli
RUN docker-php-ext-install pdo_mysql
# Include alternative DB driver
# RUN docker-php-ext-install pdo
# RUN docker-php-ext-install pdo_mysql

RUN touch /tmp/xdebug.log && chmod 777 /tmp/xdebug.log
RUN apt-get update \
    && apt-get install -y sendmail libpng-dev \
    && apt-get install -y vim \
    && apt-get install -y lsb-release \
    && apt-get install -y libzip-dev \
    && apt-get install -y zlib1g-dev \
    && apt-get install -y unzip \
    && apt-get install -y libonig-dev \
    && apt-get install -y tree \
    && rm -rf /var/lib/apt/lists/* \
    && docker-php-ext-install zip

RUN mkdir -p /var/www/html/var/cache

RUN chown -R www-data:www-data /var/www/html/ && \
    chmod -R 777 /var/www/html/

RUN usermod -u 1000 www-data && groupmod -g 1000 www-data
RUN chown -R 1000:1000 /var/www/html

RUN docker-php-ext-install mbstring
RUN docker-php-ext-install zip
RUN docker-php-ext-install gd
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

RUN a2enmod rewrite

# Xdebug installation
RUN pecl install xdebug \
    && docker-php-ext-enable xdebug

# Xdebug configuration
#RUN { \
#    echo 'xdebug.mode=debug'; \
#    echo 'xdebug.client_host=host.docker.internal'; \
#    echo 'xdebug.start_with_request=yes'; \
#} >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

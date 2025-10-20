FROM php:8.2.6-fpm-alpine As base

RUN apk add --update \
    zlib-dev \
    libpng-dev \
    freetype-dev \
    libjpeg-turbo-dev \
    libzip-dev \
    $PHPIZE_DEPS \
    nodejs \
    npm

RUN pecl install redis
RUN apk --no-cache add procps

RUN docker-php-ext-install exif
RUN docker-php-ext-configure gd --with-jpeg
RUN docker-php-ext-install gd
RUN docker-php-ext-install zip
RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-enable redis

RUN npm install -g pm2

WORKDIR /var/www/html

RUN addgroup -g 1000 -S dmn
RUN adduser -G dmn -u 1000 dmn -D

FROM base AS build-fpm

COPY /project /var/www/html

RUN php composer.phar i --prefer-dist --no-ansi --no-dev

FROM build-fpm AS develop

COPY /ops/docker/fpm/www.conf /usr/local/etc/php-fpm.d/www.conf
COPY /ops/docker/fpm/user.ini /usr/local/etc/php/conf.d/user.ini

RUN chmod +x /var/www/html/entry-point.sh

RUN php artisan optimize

RUN chmod -R 777 storage

ENTRYPOINT ["./entry-point.sh"]

FROM develop as production

RUN docker-php-ext-install opcache

RUN docker-php-ext-configure opcache --enable-opcache

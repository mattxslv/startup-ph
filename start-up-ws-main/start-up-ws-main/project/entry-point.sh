#!/bin/sh

pm2 start queue-workers.json

php composer.phar du

php-fpm

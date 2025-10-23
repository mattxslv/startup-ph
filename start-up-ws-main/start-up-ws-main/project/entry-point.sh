#!/bin/sh

pm2 start queue-workers.json

exec php-fpm

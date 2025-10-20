# Start Up

A Laravel-based startup registration and management platform developed for DICT (Department of Information and Communications Technology).

## Prerequisites

Before deploying the application, ensure you have the following:

- **Docker** - Latest version installed and running
- **Database Connection** - Mariadb:10.8 server connection details
- **Redis Connection** - Redis server for caching and session management
- **Elasticsearch Connection** - Elasticsearch 7 for search functionality
- **Turnstile Credentials** - Cloudflare Turnstile secret key for CAPTCHA verification
- **eGov Credentials** - Government integration access credentials
  - Access URL
  - Access Code
  - Access Token
- **Mailer Credentials** - SMTP server details for email functionality
  - Host
  - Port
  - Username
  - Password
  - Encryption type
- **Cloudwatch Credentials** (Optional) - AWS Cloudwatch for application logging
  - Log Region
  - Access Key
  - Secret Key

## Environment Configuration

The application requires two separate `.env` files:

### 1. Root `.env` File

Create a `.env` file in the root directory:

```env
COMPOSE_PROJECT_NAME=start-up-ws
```

For staging deployments, you may also need:
```env
COMPOSE_WEBSERVER_PORT=8080
```

### 2. Application `.env` File

Create a `project/.env` file with the following configuration:

```env
APP_NAME="Start Up"
APP_ENV=production
APP_KEY=
APP_DEBUG=false
APP_URL=https://your-domain.com

LOG_CHANNEL=cloudwatch
LOG_SLACK_WEBHOOK_URL=
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

CLOUDWATCH_LOG_REGION=ap-southeast-1
CLOUDWATCH_LOG_KEY=your-cloudwatch-key
CLOUDWATCH_LOG_SECRET=your-cloudwatch-secret

DB_CONNECTION=mysql
DB_HOST=your-database-host
DB_PORT=3306
DB_DATABASE=startup
DB_USERNAME=your-db-username
DB_PASSWORD=your-db-password

BROADCAST_DRIVER=log
CACHE_DRIVER=redis
FILESYSTEM_DISK=local
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=your-redis-host
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=your-mail-host
MAIL_PORT=587
MAIL_USERNAME=your-mail-username
MAIL_PASSWORD=your-mail-password
MAIL_ENCRYPTION=tls
MAIL_FROM_ADDRESS=noreply@your-domain.com
MAIL_FROM_NAME="${APP_NAME}"
SUPPORT_EMAIL=support@your-domain.com

ELASTIC_HOST=your-elasticsearch-host:9200

EGOV_ACCESS_URL=https://egov-api-url.gov.ph
EGOV_ACCESS_CODE=your-egov-code
EGOV_ACCESS_TOKEN=your-egov-token

TURNSTILE_SECRET=your-turnstile-secret
```

**Note:** Replace all placeholder values with your actual credentials and connection details.

## Deployment Instructions

### Step 1: Clone Repository

```bash
git clone <repository-url>
cd start-up-ws
```

### Step 2: Create Environment Files

Create the required environment files as described in the [Environment Configuration](#environment-configuration) section above.

### Step 3: Build and Run Docker Containers

Choose the appropriate command based on your deployment environment:

**For Staging:**
```bash
docker-compose -f docker-compose-stg.yml up -d --build
```

**For Production:**
```bash
docker-compose -f docker-compose-prod.yml up -d --build
```

### Step 4: Access the Application Container

```bash
docker exec -it start-up-ws-app sh
```

### Step 5: Install Dependencies

Inside the container, run:

```bash
php composer.phar install --prefer-dist --no-ansi --no-dev
```

### Step 6: Generate Application Keys

```bash
php artisan key:generate
php artisan config:cache
```

### Step 7: Run Migrations

Run database and Elasticsearch migrations:

```bash
php artisan migrate
php artisan elastic:migrate
```

### Step 8: Seed Database

Run the following seeders in order:

```bash
php artisan db:seed --class=AdministratorSeeder
php artisan db:seed --class=RolesPermissionsSeeder
php artisan db:seed --class=RemarkSeeder
php artisan db:seed --class=AssessmentTagSeeder
php artisan db:seed --class=RequirementSeeder
php artisan db:seed --class=SectorSeeder
php artisan db:seed --class=TestimonialSeeder
```

### Step 9: Import Address Tables

Using your preferred database client (e.g., MySQL Workbench, phpMyAdmin, or command line), import the SQL files from the `dumps` folder:

- `dumps/start-up-address.sql` - Address and location data
- `dumps/PSCC-latest.sql` - Philippine Standard Classification Code data

**Example using command line:**
```bash
mysql -h your-db-host -u your-db-username -p startup < dumps/start-up-address.sql
mysql -h your-db-host -u your-db-username -p startup < dumps/PSCC-latest.sql
```

## Post-Deployment

### Verify Installation

1. Access your application URL
2. Check that the application loads correctly
3. Verify database connectivity
4. Test Elasticsearch search functionality
5. Verify email delivery (use test email feature if available)
6. Check logs in Cloudwatch (if configured)

### Queue Workers

For background job processing, ensure queue workers are running. The queue configuration is defined in `queue-workers.json`.

### Troubleshooting

- **Container won't start**: Check Docker logs with `docker logs start-up-ws-app`
- **Database connection errors**: Verify database credentials and network connectivity
- **Permission issues**: Ensure proper file permissions for `storage` and `bootstrap/cache` directories
- **Elasticsearch errors**: Verify Elasticsearch is running and accessible from the application container

## Development Environment

For local development, use the standard `docker-compose.yml` file:

```bash
docker-compose up -d --build
```

This includes a local Elasticsearch instance and mounts the project directory for live code updates.

## Additional Notes

- The application uses Redis for both caching and session management
- Elasticsearch 7.17 is used for search functionality
- Queue workers process background jobs (emails, notifications, etc.)
- AWS Cloudwatch integration is optional but recommended for production monitoring
- The application integrates with eGov for government services
- Cloudflare Turnstile provides CAPTCHA protection


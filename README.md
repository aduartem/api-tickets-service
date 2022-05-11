# api-tickets-service

## Requirements

- Node v16.15.0
- NPM 8.5.5
- MySQL 8.0.25

## Installation

### 1. Create database

```
mysql -uroot -p
Enter password: *****

....

create database tickets;
```

<br>


### 2. Install node dependencies

<br>

At the root of the project:

```
npm i
```

### 3. Environment Variables

Example environment file

```
NODE_ENV=dev
APP_NAME=api-tickets-service
PORT=3002
DB_USER=root
DB_PASS=root
DB_NAME=tickets
DB_HOST=localhost
DB_PORT=3306
DB_DIALECT=mysql
DB_TIMEZONE=false
DB_LOGGING=true
```

<br>

### 4. Starting the service

<br>

At the root of the project:

```
npm start
```

The database tables should be created automatically

### 5. Running Seeds

<br>

At the root of the project:

```
npx sequelize-cli db:seed:all --url 'mysql://root:password@localhost/database_name'
```

Example:

```
npx sequelize-cli db:seed:all --url 'mysql://root:root@localhost/tickets'
```

## Check code style with eslint

<br>

At the root of the project:

```
npm run eslint
```

# Ericgi231.me
My personal portfolio website for hosting interesting projects and learning new tech.
- Frontend
    - Framework - ReactJS
    - Build Tool - Vite
    - Language - Typescript
- Backend
    - Runtime - NodeJS
    - Database - MySQL
    - Language - Typescript + PHP
- General
    - Testing - Jest
    - Linter - ESLint
    - Deployment - NPM + NodeJS Scripts

## Projects + Learning

Overall this site has been a learning experience in react and web development while de-rusting my skills working on larger projects using pacakge managers and build tools. Each project on it acts to further my experience and learning.

### File Database
A public file database allowing for anyone to upload and view files in a responsive and dynamic webpage. The goal was an easier method of sharing files quickly between friends while maintaining unlimited history. 

This file database is exposed via apis that allow my discord bot to retrieve files from it and display them in discord natively through the webserver links.

This page has existed for a long time and has gone through multiple complete rebuilds over the years. Originally built in just php with MySQL, this project was a test in my ability to adapt old code to a new language while maintaining the same look and feel.

It was also an opportunity to learn how to write public facing APIs in php.

### Animal Race Bets
Currently in progress, this app is intended to mimic the viral Horse Race Tests while introducing a betting system and always online persistent races. 

The goal is to learn how to setup and run a NodeJS backend with web sockets. I have placed the challenge on myself of getting the NodeJS backend working with TypeScript and having the APIs exposed alongside my existing PHP apis.

## How To Build + Host

### Prerequisites 
1. A webserver
    - How to setup Apache2 https://httpd.apache.org/docs/2.4/install.html
    - If using Apache2
        - The desired file structure is as follows
        ```
        /var/www/
        ├── html/
        ├── node-api/
        └── php-api/
        ```
        - Your sites config must contain the following
        ```
        DocumentRoot /var/www/html
        Alias /php-api /var/www/php-api
        <Directory /var/www/php-api>
            Options Indexes FollowSymLinks
            AllowOverride None
            Require all granted

            SetEnv DB_USER_ENV db_usr_name
            SetEnv DB_PASS_ENV db_usr_pass
            SetEnv DB_NAME_ENV db_name
        </Directory>

        RewriteEngine On
        RewriteCond %{HTTP:Upgrade} =websocket [NC]
        RewriteRule ^/socket.io/(.*)$ ws://localhost:3001/socket.io/$1 [P,L]

        ProxyPreserveHost On
        ProxyPass "/socket.io/" http://localhost:3001/socket.io/
        ProxyPassReverse "/socket.io/" http://localhost:3001/socket.io/

        ProxyPass /node-api http://localhost:3001/node-api
        ProxyPassReverse /node-api http://localhost:3001/node-api
        ```
1. PHP
    - Configured to allow environment variables by adding this line to your php.ini
    ```
    variables_order = EGPCS
    ```
1. NPM with ReactJS + NodeJS
    - How to setup npm  https://www.w3schools.com/whatis/whatis_npm.asp
1. An SQL server with a table matching the following schema and a valid user
    ```
    CREATE TABLE IF NOT EXISTS files(  
        name VARCHAR(300) NOT NULL PRIMARY KEY,
        file_type VARCHAR(30) NOT NULL,
        special TINYINT(1) NOT NULL DEFAULT 0,
        created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP);
    ```
    - How to setup mysql https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/
    - A script to generate this table and auto populate it with real data https://gist.github.com/Ericgi231/49917055b4d98277cabf03bc4184eaea

### Building
1. Clone the code to your machine
1. Update `homepage` in `package.json` to your desired url
1. Execute `npm run build`
    - To test locally first `npm run dev`
    
### Hosting
1. Create an .htaccess file to your root containing the following lines:
    ```
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
    ```
1. Create a `collection` folder in the root of your website that will contain any files you want hosted in the public file database
1. Create an .env file in the root directory containing:
    ```
    DEPLOY_HOST=host
    DEPLOY_USER=server_user
    DEPLOY_KEY_PATH=ssh_private_key
    ```
    - Note you will need to generate an ssh key pair and add the public key to the known hosts on the server
1. Run `npm run deploy`

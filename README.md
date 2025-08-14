# Ericgi231.me
My personal portfolio website created in reactjs and php to host interesting projects.

### File Database
A public file database allowing for anyone to upload and view files in a responsive and dynamic webpage. The goal was an easier method of sharing files quickly between friends while maintaining unlimited history. 

This file database is exposed via apis that allow my discord bot to retrieve files from it and display them in discord natively through the webserver links.

### More To Come
More pages in progress

## How To Build + Host

### Prerequisites 
1. A webserver
    - How to setup Apache2 https://httpd.apache.org/docs/2.4/install.html
1. PHP
    - Configured to allow environment variables by adding this line to your php.ini
    ```
    variables_order = EGPCS
    ```
1. NPM with ReactJS
    - How to setup npm  https://www.w3schools.com/whatis/whatis_npm.asp
1. A sql server with a table matching the following schema and a valid user
    ```
    CREATE TABLE IF NOT EXISTS files(  
        name VARCHAR(300) NOT NULL PRIMARY KEY,
        file_type VARCHAR(30) NOT NULL,
        special TINYINT(1) NOT NULL DEFAULT 0,
        created DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP);
    ```
    - How to setup mysql https://dev.mysql.com/doc/mysql-installation-excerpt/5.7/en/
    - A script to generate this table and auto populate it with real data https://github.com/Ericgi231/Files_To_MySQL_Table

### Building
1. Clone the code to your machine
1. Update `homepage` in `package.json` to your desired url
1. Execute `npm run build`
    - To test locally first, execute `npm run dev`
    
### Hosting
1. Copy the contents of the generated `dist` folder to the root directory of your website
1. Create an .htaccess file to your root containing the following lines:
    ```
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
    SetEnv GOD_DB_USER your_value_here
    SetEnv GOD_DB_PASS your_value_here
    SetEnv GOD_DB_NAME your_value_here
    ```
1. Copy the api folder into your webserver root
    - Confirm PHP is working by creating an info.php file containing:
    ```
    <?php phpinfo(); ?>
    ```
1. Create a `collection` folder in the root of your website that will contain any files you want hosted in the public file database

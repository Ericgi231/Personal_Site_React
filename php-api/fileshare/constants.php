<?php
require_once __DIR__ . '../config.php';

define('SERVER', 'localhost');
define('DB_USER_ENV', 'DB_USER_ENV');
define('DB_PASS_ENV', 'DB_PASS_ENV');
define('DB_NAME_ENV', 'DB_NAME_ENV');
define('MAX_FILE_SIZE', 150 * 1024 * 1024); // 150MB in bytes
define('MAX_FILE_SIZE_MB', 150 );
define('TIMEOUT_SECONDS', 10 );

// Environment detection function
function getCollectionPath() {
    // Check for development environment indicators
    $isDevEnvironment = (
        $_SERVER['HTTP_HOST'] === 'localhost' || 
        $_SERVER['HTTP_HOST'] === '127.0.0.1' || 
        strpos($_SERVER['HTTP_HOST'], 'localhost:') === 0 ||
        strpos($_SERVER['HTTP_HOST'], '127.0.0.1:') === 0
    );
    
    if ($isDevEnvironment) {
        // Development environment - relative to php-api directory
        return __DIR__ . '/../collection';
    } else {
        // Production environment - absolute path
        return '/var/www/html/collection';
    }
}
// Make the collection path available as a constant
define('COLLECTION_PATH', getCollectionPath());
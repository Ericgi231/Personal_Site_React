<?php
function getConfig() {
    if (file_exists(__DIR__ . '/../config/php-dev.php')) {
        return require __DIR__ . '/../config/php-dev.php';
    }
    return [
        'DB_NAME_ENV' => getenv('DB_NAME_ENV') ?: 'dbname',
        'DB_USER_ENV' => getenv('DB_USER_ENV') ?: 'dbuser',
        'DB_PASS_ENV' => getenv('DB_PASS_ENV') ?: 'dbpass',
        'COLLECTION_PATH_ENV' => getenv('COLLECTION_PATH_ENV') ?: 'path/to/collection',
        'DEBUG' => false
    ];
}
$config = getConfig();
?>
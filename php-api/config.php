<?php
function getConfig() {
    if (file_exists(__DIR__ . '/../config/php-dev.php')) {
        return require __DIR__ . '/../config/php-dev.php';
    }
    return [
        'DATABASE_HOST' => getenv('DATABASE_HOST'),
        'API_KEY' => getenv('API_KEY'), 
        'DEBUG' => false
    ];
}
$config = getConfig();
?>
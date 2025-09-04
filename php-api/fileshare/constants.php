<?php
require_once __DIR__ . '/../config.php';

define('SERVER', 'localhost');
define('DB_NAME', $config['DB_NAME_ENV']);
define('DB_USER', $config['DB_USER_ENV']);
define('DB_PASS', $config['DB_PASS_ENV']);
define('COLLECTION_PATH', $config['COLLECTION_PATH_ENV']);
define('MAX_FILE_SIZE', 150 * 1024 * 1024); // 150MB in bytes
define('MAX_FILE_SIZE_MB', 150 );
define('TIMEOUT_SECONDS', 10 );
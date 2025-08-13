<?php
header('Content-Type: application/json');

// Database connection parameters
// TODO: Extract these to a configuration file or environment variables
$servername = "";
$sqlUserName = "";
$sqlPassword = "";
$dbname = "";

$DEFAULT_START = 0;
$MAX_FILES_PER_REQUEST = 10;
// TODO: Extract these to a configuration file or environment variables
$FILE_DIRECTORY = "/collection/";

// Fail non GET requests
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Only GET requests are allowed.'
    ]);
    exit;
}

// Get the base URL dynamically
$frontendHost = isset($_SERVER['HTTP_X_FRONTEND_HOST']) ? $_SERVER['HTTP_X_FRONTEND_HOST'] : $_SERVER['HTTP_HOST'];
$scheme = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off') ? "https" : "http";
$baseUrl = $scheme . "://" . $frontendHost;

// Get arguments
$start = isset($_GET['start']) ? $_GET['start'] : $DEFAULT_START;
$size = isset($_GET['size']) ? $_GET['size'] : $MAX_FILES_PER_REQUEST;
$query = isset($_GET['query']) ? $_GET['query'] : null;

// Connect to the database
$conn = new mysqli($servername, $sqlUserName, $sqlPassword, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: $conn->connect_error");
}

$sql = "SELECT COUNT(*) as count FROM files";
if (!is_null($query)) {
    $sql .= " WHERE name LIKE '%" . $conn->real_escape_string($query) . "%'";
}
$result = $conn->query($sql);

$count = 0;
if ($result) {
    $row = $result->fetch_assoc();
    $files[] = ['total_files' => $row['count']];
}

$sql = "SELECT name, file_type, special, created FROM files";
if (!is_null($query)) {
    $sql .= " WHERE name LIKE '%" . $conn->real_escape_string($query) . "%'";
}
$sql .= " ORDER BY created ASC LIMIT $size OFFSET $start";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        $files[] = [
            'url' => $baseUrl.$FILE_DIRECTORY.$row['name'].".".$row['file_type'],
            'special' => $row['special'],
            'name' => $row['name'],
            'file_type' => $row['file_type'],
            'created' => $row['created']];
    }
}

//close connection
$conn->close();

if (empty($files)) {
    $files = [];
}
echo json_encode($files);
?>
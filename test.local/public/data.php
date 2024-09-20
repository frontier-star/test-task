<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
header('Content-Type: application/json');

// Подключение к базе данных
$servername = "127.127.126.26";
$username = "root";
$password = "";
$dbname = "test";

$conn = new mysqli($servername, $username, $password, $dbname);

// Проверка соединения
if ($conn->connect_error) {
	die("Connection failed: " . $conn->connect_error);
}

// SQL-запрос для получения данных
$sql = "SELECT `name`, `lastname` FROM `username`";
$result = $conn->query($sql);

$users = [];

if ($result === false) {
	die("SQL error: " . $conn->error);
}

if ($result->num_rows > 0) {
	// Извлечение данных
	while ($row = $result->fetch_assoc()) {
		$users[] = $row;
	}
}

// Закрытие соединения
$conn->close();

// Возврат данных в формате JSON
echo json_encode($users);
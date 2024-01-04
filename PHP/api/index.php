<?php 

include 'DbConnect.php';
$objDb = new DbConnect;
$conn = $objDb->connect();

// $sql = "SELECT * FROM guest_book";
// $stmt = $conn->prepare($sql);
// $stmt->execute();
// $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
// echo json_encode($users);

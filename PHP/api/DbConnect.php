<?php 
    class DbConnect {
        private $server = 'localhost:8000';
        private $dbname = 'ghrbs2070';
        private $user = 'ghrbs2070';
        private $pass = 'merry372!@';

        public function connect() {
            try {
                // $conn = new PDO('MariaDB:host=' ,$this->server ,';dbname=' ,$this->dbname, $this->user, $this->pass);
                // $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                // return $conn;
                echo "Maria DB 연결 테스트22<br>";
                $db = mysqli_connect($this->server ,$this->dbname, $this->user, $this->pass);
                // $db = mysqli_connect("localhost:8000","ghrbs2070","merry372!@");
                if($db){
                echo "connect: success<br>";
                }else{
                echo "connect: failure<br>";
                }
            } catch (\Exception $e) {
                echo "Database Error: ", $e->getMessage();
            }
        }
    }
?>
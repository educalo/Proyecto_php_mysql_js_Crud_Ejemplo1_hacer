<?php
$servidor="localhost";
$usuario="root";
$password="";
// Cambiar por el nombre que le hayas dado a tus datos
$bbs="valores";
$conn = new mysqli($servidor,$usuario,$password,$bbs);
if ($conn->connect_error){
      //die finaliza la conexion
      die("Conexión fallida ". $conn->connect_error);
}
?>
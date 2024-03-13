<?php
include 'datosConexion.php';

//el fichero recibido lo meto en la variable data y convierto de json a php
$data=json_decode(file_get_contents("php://input"));

// Descomponemos data y lo convertimos a formato JSON
if ($data){
    $valores=json_encode($data->aGuardar);
    $titulo=json_encode($data->aTitulo);
    console.log($valores);
    console.log($titulo);
    $sql="INSERT INTO mitabla (titulo, datos) VALUES('$titulo','$valores')";
    $conn->query($sql);
    //para que js sepa que lo ha realizado ok
    echo "ok";
}

$conn->close();

?>
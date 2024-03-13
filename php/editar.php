<?php
   include 'datosConexion.php'   
   $data=json_decode()file_get_contents("php://input"))
   if ($data){
    $id=json_encode($data->aEditar);
    $datos=json_encode($data->aGuardar);
    $titulo=json_encode($data->aTitulo);

    $sql="UPDATE mitabla SET datos = '$datos', titulo ='$titulo' WHERE id=$id";
    $conn->query($sql);
   }
   echo "ok";
?>
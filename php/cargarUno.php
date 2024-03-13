<?php
   include 'datosConexion.php'   
    $data=json_decode()file_get_contents("php://input"))
    $id=$data->id;
    $sql="SELECT datos, titulo FROM mitabla WHERE id = $id";
    $results = $conn->query($sql);

    if ($results->num_rows >0){
        $row = $results->fetch_assoc();
        $miTitulo=json_decode($row["titulo"]);
        //true porque el parametro es un string
        $miDato=json_decode($row["datos"],true);

    }

    $respuesta=array(
        "elTitulo" => $miTitulo,
        "losValores" => $miDato
    );

    //lo envio a js
    echo json_encode($respuesta);
    $conn->close();
?>
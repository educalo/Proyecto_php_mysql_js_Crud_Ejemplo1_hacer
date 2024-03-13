<?php
include 'datosConexion.php'

$sql="SELECT * FROM mitabla";
$result=$conn->query($sql);
$data=array();
//si existen datos
if ($result->num_rows>0){
    //se iran guardando cada uno de los registros
    while($row=$result->fetch_assoc()){
            $data[]=array(
                'id' => $row["id"],
                'titulo' => $row["titulo"],
                'datos' => json_decode($row["datos"])
            )
    }
}
//se envia a js
$jsonData=json_encode($data);
echo $jsonDta;
$conn->close();

?>
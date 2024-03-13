let DATOS=[];
let elId;
const NOMBRE=document.querySelector("#producto");
//añado un evento
NOMBRE.addEventListener("Keydown", teclado);
document.querySelector(".btinsertar").addEventListener("click", insertar);
document.querySelector(".bteditar").addEventListener("click", editar);
vaciar();
cargarTodos();

function teclado(e){
    let tecla=e.key;
    if (tecla==="Enter"){
        leer();
    }
}

function leer(){
    const ESCRITO=NOMBRE.value.trim();
    if (ESCRITO){
        if(ESCRITO){
            IF ((DATOS.length>0) && (document.querySelector(".listainsertar").innerHTML==="")) 
                {
                    DATOS=[];
                }
        //lo añado en formato objeto
        DATOS.push({"elNombre ": ESCRITO, "estrellas":1});
        escribir(ESCRITO);
        vaciar();
        }
    }
}

function escribir(valor){
    //me invento un atributo at para identificar cada linea
    document.querySelector(".listainsertar").insertAdjacentElement("beforeend", `
    
    <div class="linea" at="${DATOS.length-1}">
        <div class "nombre">${valor}</div>
        <div class="estrellas">
            <img src="img/estrella.png" onclick="unaMas(this)">
        </div>
    </div>
    `)

}

function unaMas(e){
    //e es estrella que he pinchado, me vaya al padre y cuente los img que hay
    let hay=e.parentNode.querySelector("img").length;
    if (hay>=6){
        hay=0;
        //sustituyo el nuevo elemento
        e.parentNode.innerHTML=`<img src="img/estrella.png" onclick="unaMas(this)">`
    }
    //me estoy situando en la linea de class="linea"
    let indice=e.parentNode.parentNode.getAttribute("at");
    DATOS[indice].estrellas=++hay;
    //añado un nuevo elemento
    e.parentNode.insertAdjacentElement("beforeend", `
        <img src="img/estrella.png" onclick="unaMas(this)">
    `);
}

function vaciar(){
    NOMBRE.value="";
    NOMBRE.focus();
}

//lo que hace el boton insertar
function insertar(){
    const TITULO=document.querySelector("#titulo").value.trim();
    limpiar();
    // Objeto a enviar al servidor
    const data = {
        aGuardar: DATOS, // Suponiendo que DATOS es una variable global
        aTitulo: TITULO
    };
    //para poder comunicarnos con php
    fetch('php/insertar.php', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        //convertir json a texto
        body: JSON.stringify(data)
    })
    .then(()=>{
        cargarTodos();
    })
    /*
    .then(a=> a.json())
    //la conversion a formato json se le pasa a la siguiente promesa en este caso data
    .then(data => function1(data))
    .catch(error => {
        console.error("El error es: ", error)
    })*/
    
    

}

function cargarTodos(){
    document.querySelector(".listaCargar").innerHTML="";
    fetch("php/cargarTodos.php")
    .then(response=>response.json())
    .then(data=>{
        //enviarlo a escribir información
        //escribirLista(data);
    })
}

//defino un atributo ficticio at
function escribirLista(registros){
    //hay dos eventos en esta funcion primero lanza el primero y luego lanza el segundo evento
    registros.map((valor, i) =>
        document.querySelector(".listaCargar").insertAdjacentHTML("beforeend",
        `
        <div class="bloque" at="${valor.id}" onclick="ver(this)">
            <strong>${JSON.parse(valor.titulo)}</strong>
            <div>(${valor.datos.length} valores)</div>
            <img src="img/papelera.png" onclick="eliminar(this,event)"/>
        </div>
        `)
    
    
    )
}

function ver(e){
    //variable local
    //const elId=e.getAttribute("at");
    //para hacer elId global lo pongo al principio del fichero
    elId=e.getAttribute("at");
    fetch("php/cargarUno.php", 
    {
        method:"POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id:elId
        })           
    })
    .then(a=> a.json())
    .then(data=>{
        DATOS=data.losValores;
        escribirTodo(data.elTitulo, data.losValores);
    })
}

//el objeto que provoca el evento y el evento en si
function eliminar(e, event){
    //no propage el evento y se quede aqui
    event.stopPropagation();
    const id=e.parentNode.getAttribute("at");
    fetch("php/eliminar.php",{
        method:'POST',
        hearders:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id:id
        })
    })
    .then(()=>cargarTodos());
    limpiar();


}

function escribirTodo(titulo, valores){
    document.querySelector(".listaEditar").innerHTML="";
    document.querySelector("#tituloEditar").value=titulo;
    valores.map((valor,indice)=>{
        document.querySelector(".listaEditar").insertAdjacentElement("beforeend", `
        <div class="linea" at="${indice}">
            <div class="nombre">${valor.elNombre}</div>
            <div class="estrellas"></div>
        </div>
        `)
        for (letk=0;k<valor.estrellas;k++){
            document.querySelectorAll(".estrellas")[indice].insertAdjacentHTML("beforeend", `
            <img src="img/estrella.png" onclick="unaMas(this)"/>
            
            `)
        }
    })
}

function editar(){
    const TITULO=document.querySelector("#tituloEditar").value.trim();
    limpiar();
    fetch("php/editar.php",{
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        }, 
        body: JSON.stringify({
            aEditar:elId,
            aGuardar: DATOS,
            aTitulo:TITULO
        })
    }) 
    .then(()=>{
        cargarTodos();
    })
}

function limpiar(){
    document.querySelector(".listainsertar").innerHTML="";
    document.querySelector(".listaEditar").innerHTML="";
    document.querySelector("#tituloEditar").value="";
    document.querySelector("#productoEditar").value="";
    document.querySelector("#titulo").value="";
    document.querySelector("#producto").value="";
    document.querySelector("#titulo").focus();
}
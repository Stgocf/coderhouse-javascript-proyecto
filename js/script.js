/*
codigo javascript pensando en la venta de srvicios automatizada de consultoria
se presentaran varias categorias, cursos online, talleres prescenciales, proyectos y consultoria

cursos onine: listado de cursos, poder comprar un curso a la vez o pagar suscripcion anual
talleres: 3 niveles, se compran de a 1, + posibilidad de agendar
proyectos y consultoria: posibilidad de agendar y entregar descripción de la idea, sin costo

costos:
Cursos Online: 
    1 USD , 5 usd suscripcion anual
Talleres: 
    basico: curso 8 horas 70 USD p/p x hora -> 420 USD p/p 
    avanzado: curso 8 horas 80 USD p/p x hora -> 640 USD p/p
    experto: curso 8 horas 100 USD p/p x hora -> 800 USD p/p 
proyectos/consultoria: 
    si costo primera agenda, luego 120x hora


*/

let totalCompra=0
let nombreCliente = ''
let codServicio = 0
let subCodServicio = 0
let boolMenuInicial = true
let boolServicios = true

//clase producto que tiene la estructura principal de datos de cada prodcto ofrecido
class producto{
    constructor(nombre, precio, stock, tipo){
        this.nombre = nombre,
        this.precio = precio,
        this.stock = stock,
        this.tipo = tipo
    }
    describir(){
        console.log('El producto '+this.nombre+' que tiene un precio de '+this.precio+' con un stock de '+this.stock)
    }
}

//array de productos disponibles en tiend
let galeriaProductos = []
fetch('https://raw.githubusercontent.com/Stgocf/coderhouse-javascript-proyecto/main/files/productos.json')
    .then(response => response.json())
    .then( data => {
        data.forEach( (prod) => {
            newProd = new producto(prod.nombre, parseInt(prod.precio), parseInt(prod.stock), prod.tipo)
            galeriaProductos.push(newProd)
        })
    })

//inicializamos el carrito de compra copmo array
let carritoProductos = []

//fncion que permite obtener el nombre del cliente
function solicitaNombre(){
    let menuPrincipal = document.getElementById('ingresa-nombre')

    let mensajeBienvenida = document.createElement('h3')
    mensajeBienvenida.innerText = 'Bienvenido! ingresa tu usuario'
    menuPrincipal.append(mensajeBienvenida)

    let formNombre = document.createElement('form')
    formNombre.setAttribute("id", "formNombre")

    let inputName = document.createElement('input')
    inputName.setAttribute("type", "text")
    inputName.setAttribute("id", "inputName")
    formNombre.append(inputName)

    let submitInputName = document.createElement('input')
    submitInputName.setAttribute("type", "submit")
    submitInputName.setAttribute("value", "Ingresar")
    formNombre.append(submitInputName)
    
    menuPrincipal.append(formNombre)

    //evento para form submit
    //formNombre.addEventListener("submit", ingresaNombreSubmit)
    formNombre.onsubmit = (e) => {
        nombreCliente = document.getElementById('inputName').value
        console.log(nombreCliente)

        //revisamos si ya tenia carrito de compras!
        let clienteEnLS = JSON.parse(localStorage.getItem(nombreCliente) )
        if (clienteEnLS){
            //transformamos la data e objetos y precargamos el carrito de compras
            menuPrincipal.innerHTML = ''
            for (let obj of clienteEnLS){
                carritoProductos.push(new producto(obj.nombre, obj.precio, obj.stock, obj.tipo))
            }
            let msj = document.createElement('h3')
            msj.innerText = 'Que gusto tenerte de vuelta '+nombreCliente+' :) !'
            menuPrincipal.append(msj)
            msj = document.createElement('p')
            msj.innerText = 'Gracias por volver a preferirnos! te recuerdo que tienes '+carritoProductos.length+' productos e el carrito'
            menuPrincipal.append(msj)
        }
        menuInicial(nombreCliente)
        e.preventDefault()
      }

}

//Menu principal con acciones
function menuInicial(nombreCliente){
    let menuPrincipal = document.getElementById('menu-principal')

    let bienvenida = document.createElement('h3')
    bienvenida.innerText = 'Como deseas que te ayudemos '+nombreCliente+' ?'

    let listaMenu = document.createElement('ul')
    opcionesMenu = ['(1 - Cursos Online)',
                    '(2 - Talleres)', 
                    '(3 - Proyectos/Consultoria)', 
                    '(4 - Ver Carrito de Compras)',
                    '(5 - Salir)']
    for (let opcion of opcionesMenu){
        let li = document.createElement('li')
        //li.innerText = opcion
        let btn = document.createElement('button');
        btn.setAttribute("id", opcion);
        btn.innerText = opcion
        btn.onclick  = (e) => {
            let botonSeleccionado = btn.innerText
            console.log(botonSeleccionado)
            subMenu(botonSeleccionado)
            e.preventDefault()
        }
        li.append(btn)
        listaMenu.append(li)
    }

    //append de elementos dle menu priccipal
    menuPrincipal.append(bienvenida)
    menuPrincipal.append(listaMenu)
}

//funcion para saber que submenu mostrar en detalle-menu
function subMenu(botonSeleccionado){
    let detalleMenu = document.getElementById('detalle-menu')
    detalleMenu.innerHTML = ''
    switch(botonSeleccionado){
        case '(1 - Cursos Online)':
            console.log('mostrar opciones de cursos online')
            menuCursosOnline()
            break
        case '(2 - Talleres)':
            console.log('mostrar opciones de talleres')
            menuTalleres()
            break
        case '(3 - Proyectos/Consultoria)':
            console.log('mostrar opciones de proyecto')
            menuConsultoria()
            break
        case '(4 - Ver Carrito de Compras)':
            console.log('mostrar carrito de compra')
            mostrarCarrito()
            break
        case '(5 - Salir)':
            console.log('cerrar sesion')
            guardarLocal()
            break
        default:
            console.log('default')
            break
    }
}

function guardarLocal(){

    localStorage.setItem(nombreCliente, JSON.stringify(carritoProductos))
    //reiniciamos web
    let div = document.getElementById('ingresa-nombre')
    div.innerHTML=''
    div = document.getElementById('menu-principal')
    div.innerHTML=''
    div = document.getElementById('detalle-menu')
    div.innerHTML=''
    carritoProductos = []
    //comenzamos de nuevo
    solicitaNombre()
}

//fncion que totaliza valores
function actualizaTotalCompra(){
    let totalPrecio = 0
    carritoProductos.forEach( (prod) => {
        totalPrecio = totalPrecio + prod.precio
    } )

    let msjEvento = document.getElementById('msjEvento')
    msjEvento.innerText = 'Valor Total del Carrito: $'+totalPrecio
}

/* 
--------------------------------------------------------------------------------------
METODOS DEL CARRITO DE COMPRAS
--------------------------------------------------------------------------------------
*/
function agregarProdACarito(nombreProd){
    //buscamos objeto
    console.log('buscando objeto')
    let objProd = galeriaProductos.find( (prod) => prod.nombre === nombreProd) 
    //agregamos a carrito
    console.log('producto encontrado, añadiendo a caarrito')
    carritoProductos.push(objProd)
    console.log('producto añadido: '+objProd.nombre)
    console.log('total productos'+carritoProductos)

    //aactualizamos storage
    //guardarLocal()
}


function mostrarCarrito(){
    let detalleMenu = document.getElementById('detalle-menu');

    let mensajeDetalleMenu = document.createElement('h3');
    mensajeDetalleMenu.innerText = 'detalle del carrito de compras:';
    detalleMenu.append(mensajeDetalleMenu);

    let listaMenu = document.createElement('ul');
    opcionesMenu = galeriaProductos.filter(function (el) {
        return el.tipo === 'curso'
        });

    carritoProductos.forEach( (prod) => {
        console.log(prod.nombre);
        let li = document.createElement('li');
        li.innerText = 'Producto: '+prod.nombre+', Precio: '+prod.precio;
        listaMenu.append(li);
         } )
    
    detalleMenu.append(listaMenu);
    let msjEvento = document.createElement('p');
    msjEvento.setAttribute("id", 'msjEvento');
    detalleMenu.append(msjEvento);
    actualizaTotalCompra()

    let btnCompra = document.createElement('button')
    btnCompra.setAttribute("id", 'btnCompra');
    btnCompra.innerText = 'Comprar Ahora!';
    btnCompra.onclick  = (e) => {
        //detalleMenu.innerHTML = ''
        //let msj = document.createElement('h2')
        //msj.innerText = 'Carrito comprado! esto borra el array de productos en carrito!'
        swal({
            title: "Estás seguro de querer comprar los productos de tu carrito?",
            text: "Comprar los productos los eliminará del carrito actual",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
              swal("Gracias por confiar en nosotros, pronto te enviaremos los siguientes pasos!", {
                icon: "success",
              });
              carritoProductos = [];
            } else {
              swal("Tu carrito sigue intacto!");
            }
          });
        e.preventDefault()
    };
    detalleMenu.append(btnCompra);

    /*
    let listaProductos = ''
    carrito.forEach( (prod) => {
        listaProductos = listaProductos+'Producto: '+prod.nombre+' , Precio: '+prod.precio+'\n'
    } )
    //alert(listaProductos)
    */
}

function yaExisteEnCarrito(nombreProd){
    let prodarray = carritoProductos.filter( (prod) => prod.nombre === nombreProd )
    if (prodarray.length > 0) {
        return true
    }
    else {
        return false
    }
}

function existeCarritoSwal(botonSeleccionado){
    if ( yaExisteEnCarrito(botonSeleccionado) ){
        msjEvento.innerText = 'producto '+botonSeleccionado+' ya existe en carrito!!'
        swal('producto '+botonSeleccionado+' ya existe en carrito!!')
    }
    else {
        agregarProdACarito(botonSeleccionado)
        //msjEvento.innerText = 'producto '+botonSeleccionado+' agregado :) !!'
        swal('producto '+botonSeleccionado+' agregado :) !!')
    }
}


/* 
--------------------------------------------------------------------------------------
METODOS DEL MENU
--------------------------------------------------------------------------------------
*/
//submenu de Cursos Online y respectivo workflow
function menuCursosOnline(){
    let detalleMenu = document.getElementById('detalle-menu');

    let mensajeDetalleMenu = document.createElement('h3');
    mensajeDetalleMenu.innerText = 'que clase de cursos online te interesa?';
    detalleMenu.append(mensajeDetalleMenu);

    mensajeDetalleMenu = document.createElement('p');
    mensajeDetalleMenu.innerText = 'selecciona un elemento para agregar al carrito';
    detalleMenu.append(mensajeDetalleMenu);

    let listaMenu = document.createElement('ul');
    opcionesMenu = galeriaProductos.filter(function (el) {
        return el.tipo === 'curso'
        });

    for (let opcion of opcionesMenu){
        console.log(opcion.nombre);
        let li = document.createElement('li');
        //li.innerText = opcion
        let btn = document.createElement('button');
        btn.setAttribute("id", opcion.nombre);
        btn.innerText = opcion.nombre;
        btn.onclick  = (e) => {
            let botonSeleccionado = btn.innerText
            console.log(botonSeleccionado)
            existeCarritoSwal(botonSeleccionado)
            e.preventDefault()
        };
        li.append(btn);
        listaMenu.append(li);
    }
    detalleMenu.append(listaMenu);
    let msjEvento = document.createElement('p');
    msjEvento.setAttribute("id", 'msjEvento');
    detalleMenu.append(msjEvento);

}

function menuTalleres(){
    let detalleMenu = document.getElementById('detalle-menu');

    let mensajeDetalleMenu = document.createElement('h3');
    mensajeDetalleMenu.innerText = 'que clase de taller te interesa?';
    detalleMenu.append(mensajeDetalleMenu);

    mensajeDetalleMenu = document.createElement('p');
    mensajeDetalleMenu.innerText = 'selecciona un elemento para agregar al carrito';
    detalleMenu.append(mensajeDetalleMenu);

    let listaMenu = document.createElement('ul');
    opcionesMenu = galeriaProductos.filter(function (el) {
        return el.tipo === 'taller'
        });

    for (let opcion of opcionesMenu){
        console.log(opcion.nombre);
        let li = document.createElement('li');
        //li.innerText = opcion
        let btn = document.createElement('button');
        btn.setAttribute("id", opcion.nombre);
        btn.innerText = opcion.nombre;
        btn.onclick  = (e) => {
            let botonSeleccionado = btn.innerText
            console.log(botonSeleccionado)
            existeCarritoSwal(botonSeleccionado)
            e.preventDefault()
        };
        li.append(btn);
        listaMenu.append(li);
    }
    detalleMenu.append(listaMenu);
    let msjEvento = document.createElement('p');
    msjEvento.setAttribute("id", 'msjEvento');
    detalleMenu.append(msjEvento);
}

function menuConsultoria(){

    let detalleMenu = document.getElementById('detalle-menu');

    let mensajeDetalleMenu = document.createElement('h3');
    mensajeDetalleMenu.innerText = 'Nuestra oferta de Proyectos y consultorias';
    detalleMenu.append(mensajeDetalleMenu);

    mensajeDetalleMenu = document.createElement('p');
    mensajeDetalleMenu.innerText = 'selecciona un elemento para agregar al carrito';
    detalleMenu.append(mensajeDetalleMenu);

    let listaMenu = document.createElement('ul');
    opcionesMenu = galeriaProductos.filter(function (el) {
        return el.tipo === 'consultoria'
        });

    for (let opcion of opcionesMenu){
        console.log(opcion.nombre);
        let li = document.createElement('li');
        //li.innerText = opcion
        let btn = document.createElement('button');
        btn.setAttribute("id", opcion.nombre);
        btn.innerText = opcion.nombre;
        btn.onclick  = (e) => {
            let botonSeleccionado = btn.innerText
            console.log(botonSeleccionado)
            //let msjEvento = document.getElementById('msjEvento')
            existeCarritoSwal(botonSeleccionado)
            e.preventDefault()
        };
        li.append(btn);
        listaMenu.append(li);
    }
    detalleMenu.append(listaMenu);
    let msjEvento = document.createElement('p');
    msjEvento.setAttribute("id", 'msjEvento');
    detalleMenu.append(msjEvento);
}


function main(){
    solicitaNombre()
}

main()

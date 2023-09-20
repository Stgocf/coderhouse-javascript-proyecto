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

//array de productos disponibles en tienda
let galeriaProductos = [
    new producto('Curso Específico', 1, 10, 'curso'),
    //new producto('cursoOnline2', 1, 10, 'curso'),
    //new producto('cursoOnline3', 1, 10, 'curso'),
    new producto('Suscripción Cursos Online', 5, 10, 'curso'),
    new producto('Taller Principiante', 420, 10, 'taller'),
    new producto('Taller Intermedio', 640, 10, 'taller'),
    new producto('Taller Experto', 800, 10, 'taller'),
    new producto('Consultoria de Proyectos', 120, 10, 'consultoria')
]

//inicializamos el carrito de compra copmo array
let carritoProductos = []

//fncion que permite obtener el nombre del cliente
function solicitaNombre(){
    while(nombreCliente == ''){
        nombreCliente = prompt('Bienvenido! ingresa tu nombre completo')
    }
}

//Menu principal con acciones
function menuInicial(){
    codServicio = parseInt(prompt('Como deseas que te ayudemos '+nombreCliente+' ?' +'\n'
                                    +'Igresa una de las siguientes opciones:'+'\n'
                                    +'(1 - Cursos Online)'+'\n'
                                    +'(2 - Talleres)'+'\n'
                                    +'(3 - Proyectos/Consultoria)'+'\n'
                                    +'(4 - Ver Carrito de Compras)'+'\n'
                                    +'(5 - Salir)'))
}

//DEPRECAR - fncion que totaliza valores
function actualizaTotalCompra(monto){
    totalCompra = totalCompra + monto
}

/* 
--------------------------------------------------------------------------------------
METODOS DEL CARRITO DE COMPRAS
--------------------------------------------------------------------------------------
*/
function agregarProdACarito(nombreProd){
    //buscamos objeto
    let objProd = galeriaProductos.find( (prod) => prod.nombre === nombreProd) 
    //agregamos a carrito
    carritoProductos.push(objProd)
}


function mostrarCarrito(carrito){
    let listaProductos = ''
    carrito.forEach( (prod) => {
        listaProductos = listaProductos+'Producto: '+prod.nombre+' , Precio: '+prod.precio+'\n'
    } )
    alert(listaProductos)
}

function yaExisteEnCarrito(nombreProd){
    let prodarray = carritoProductos.filter( (prod) => prod.nombre === nombreProd )
    if (prodarray.length > 0) {
        return '(PRODUCTO YA EXISTE EN CARRITO)'
    }
    else {
        return ''
    }
}

/* 
--------------------------------------------------------------------------------------
METODOS DEL MENU
--------------------------------------------------------------------------------------
*/
//submenu de Cursos Online y respectivo workflow
function menuCursosOnline(){
    switch(subCodServicio){
        case 1:
            actualizaTotalCompra(1)
            agregarProdACarito(nombreProd="Curso Específico" )
            alert('se ha añadido el servicio al carrito')
            break
        case 2:
            actualizaTotalCompra(5)
            agregarProdACarito(nombreProd="Suscripción Cursos Online" )
            alert('se ha añadido el servicio al carrito')
            break
        case 3:
            boolServicios = false
            break
        default:
            console.log('default menuCursosOnline')
            break
    }
}

function menuTalleres(){
    switch(subCodServicio){
        case 1:
            actualizaTotalCompra(420)
            agregarProdACarito(nombreProd="Taller Principiante" )
            alert('se ha añadido el servicio "Taller Principiante" al carrito')
            break
        case 2:
            actualizaTotalCompra(640)
            agregarProdACarito(nombreProd="Taller Intermedio" )
            alert('se ha añadido el servicio "Taller Intermedio" al carrito')
            break
        case 3:
            actualizaTotalCompra(800)
            agregarProdACarito(nombreProd="Taller Experto" )
            alert('se ha añadido el servicio "Taller Experto" al carrito')
            break
        case 4: 
            boolServicios = false
            break
        default:
            console.log('default menuTalleres')
            break
    }
}

function menuConsultoria(){
    switch(subCodServicio){
        case 1:
            actualizaTotalCompra(120)
            agregarProdACarito(nombreProd="Consultoria de Proyectos" )
            alert('se ha añadido el servicio "Consultoria de proyectos" al carrito')
            break
        case 2:
            boolServicios = false
            break
        default:
            console.log('default menuConsultoria')
            break
    }
}


function main(){
    solicitaNombre()

    while(boolMenuInicial){
        boolServicios = true
        menuInicial()
        console.log('codigo sevricio '+codServicio)
        if (codServicio >= 1 && codServicio <= 5){
            // esta todo perfecto, seguimos
            console.log('pase verificacion!!')
            while(boolServicios){
                console.log('dento de while!! boolServicios')
                switch(codServicio){
                    case 1:
                        subCodServicio = parseInt(prompt('que clase de cursos online te interesa?'+'\n'
                                                        +'(1 - CursoEspecifico 1USD)' + yaExisteEnCarrito('Curso Específico')+'\n'
                                                        +'(2 - Subscripcion Anual 5USD)' + yaExisteEnCarrito('Suscripción Cursos Online')+'\n'
                                                        +'(3 - Volver)'))
                        menuCursosOnline()
                        boolServicios = false
                        break
                    case 2:
                        subCodServicio = parseInt(prompt('que clase de Taller te interesa?'+'\n'
                                                        +'(1 - Principiante 420USD)' + yaExisteEnCarrito('Taller Principiante')+'\n'
                                                        +'(2 - Intermedio 640USD)' + yaExisteEnCarrito('Taller Intermedio')+'\n'
                                                        +'(3 - Experto 800USD)' + yaExisteEnCarrito('Taller Experto')+'\n'
                                                        +'(4 - Volver'))
                        menuTalleres()
                        boolServicios = false
                        break
                    case 3:
                        subCodServicio = parseInt(prompt('Los proyectos y consultorias se cobran por hora 120USD a hora, te interesa?' +'\n'
                                                        +'(1 - SI 120USD)' + yaExisteEnCarrito('Consultoria de Proyectos')+'\n'
                                                        +'(2 - Volver)'))
                        
                        menuConsultoria()
                        boolServicios = false
                        break
                    case 4:
                        mostrarCarrito(carritoProductos)
                        //alert('el costo total de los servicios es: '+totalCompra+'USD')
                        boolServicios = false
                        break
                    case 5:
                        alert('Gracias por tu visita!')
                        boolServicios = false
                        boolMenuInicial = false
                        break
                    default:
                        console.log('default while boolservicios')
                        boolServicios = false
                        break

                        
                }
            }
        }else{
            alert('Asegurate que el codigo de la opcion se encuentre entre 1 y 5') 
        }
    }
}


main()


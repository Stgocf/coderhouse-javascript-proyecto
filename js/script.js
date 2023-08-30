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

function solicitaNombre(){
    while(nombreCliente == ''){
        nombreCliente = prompt('Bienvenido! ingresa tu nombre completo')
    }
}

function menuInicial(){
    codServicio = parseInt(prompt('Como deseas que te ayudemos '+nombreCliente+' ? Igresa una de las siguientes opciones: (1 - Cursos Online) (2 - Talleres) (3 - Proyectos/Consultoria) (4 - Calcular Total) (5 - Salir)'))
}

function actualizaTotalCompra(monto){
    totalCompra = totalCompra + monto
}

function menuCursosOnline(){
    switch(subCodServicio){
        case 1:
            actualizaTotalCompra(1)
            alert('se ha añadido el servicio al total de a compra')
            break
        case 2:
            actualizaTotalCompra(5)
            alert('se ha añadido el servicio al total de a compra')
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
            alert('se ha añadido el servicio "Taller Principiante" al total de a compra')
            break
        case 2:
            actualizaTotalCompra(640)
            alert('se ha añadido el servicio "Taller Intermedio" al total de a compra')
            break
        case 3:
            actualizaTotalCompra(800)
            alert('se ha añadido el servicio "Taller Experto" al total de a compra')
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
            alert('se ha añadido el servicio "Taller Principiante" al total de a compra')
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
                        subCodServicio = parseInt(prompt('que clase de cursos online te interesa? (1 - CursoEspecifico 1USD) (2 - Subscripcion Anual 5USD) (3 - Volver)'))
                        menuCursosOnline()
                        boolServicios = false
                        break
                    case 2:
                        subCodServicio = parseInt(prompt('que clase de Taller te interesa? (1 - Principiante 420USD) (2 - Intermedio 640USD) (3 - Experto 800USD) (3- Volver'))
                        menuTalleres()
                        boolServicios = false
                        break
                    case 3:
                        subCodServicio = parseInt(prompt('Los proyectos y consultorias se cobran por hora 120USD a hora, te interesa? (1 - SI 120USD) (2 - Volver)'))
                        menuConsultoria()
                        boolServicios = false
                        break
                    case 4:
                        alert('el costo total de los servicios es: '+totalCompra+'USD')
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


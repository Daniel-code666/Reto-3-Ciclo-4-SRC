var endpoint = "http://129.151.116.250:8080/api/user";

$(document).ready(function(){
    $("#alerta").hide()
    getUser()
    getProducts()
    getOrders()
    $("#addOrd").click(function(){
        addOrder()
    })

    /* var myModal = document.getElementById('exampleModal');

    myModal.addEventListener('show.bs.modal', function(e){
        $.ajax({            
            type: 'GET',
            url: 'http://129.151.116.250:8080/api/hairproducts/all',
            dataType: 'json',
            success: function(data){
                for(let i = 0; i < data.length; i++){
                    let filas = $('<tr>');
                    filas.append($('<td>').append("<img src='"+data[i].photography+"' width='50%' height='50px'>"));
                    filas.append($('<td>').text(data[i].name));
                    filas.append($('<td>').text(data[i].category));
                    filas.append($('<td>').text(data[i].description));
                    filas.append($('<td>').text(data[i].price));
                    filas.append($('<td>').append("<input type='number' id='cantidad"+data[i].id+"' name='cantidad' min='0' max='"+data[i].quantity+"' />"));
                    filas.append($("<td class='text-center no-padding'>").append('<button type="button" class="btn btn-outline-success btn-sm btn-block w-100" onclick="agregarProductoOrden('+data[i].id+')">Agregar</button>'));
                    filas.append($("<td class='text-center'>").append('<button type="button" class="btn btn-outline-danger btn-sm btn-block w-100" onclick="eliminarProductoOrden('+data[i].id+',\''+data[i].name+'\')">Eliminar</button>'));
                    $("#listaProd").append(filas);
                }
            }
        })
    }) */
})

function getUser() {
    $.ajax({
        url: endpoint + "/" + localStorage.getItem("IdAse"),
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            var $row = $('<tr>');
            $row.append($('<td>').text(data.identification));
            $row.append($('<td>').text(data.name));
            $row.append($('<td>').text(data.email));
            switch(data.type){
                case 'COORD':
                    $row.append($('<td>').text('Cordinador de zona'));
                    break;
                case 'ADM':
                    $row.append($('<td>').text('Administrador'));
                    break;
                case 'ASE':
                    $row.append($('<td>').text('Asesor comercial'));
                    break;
                default:
                    $row.append($('<td>').text('Perfil no definido'));
                    break;
            }
            $row.append($('<td>').text(data.zone));
            $("#contenido").append($row);
        }
    })
}

function getProducts(){
    $.ajax({
        url: "http://129.151.116.250:8080/api/hairproducts/all",
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data.length == 0){
                $("#tabla").hide()
                $("#alertareg").show()
            }else{
                $("#alertareg").hide()
                console.log(data)
                let registro = ""
                $.each(data, function (index, prod){
                    registro += "<tr>" +
                        "<td>" + "<img src='"+prod.photography+"' width='50%' height='50px'>" + "</td>" +
                        "<td>" + prod.name + "</td>" +
                        "<td>" + prod.category + "</td>" +
                        "<td>" + prod.description + "</td>" +
                        "<td>" + prod.price + "</td>" +
                        "<td>" + prod.quantity + "</td>" +
                        "<td>" +
                        "<button class='btn btn-primary btn-sm' data-toggle='modal' data-target='#addOrdModal'" +
                        "onclick=\"ver('" + prod.reference + "')\"" +
                            ">Agregar</button>"
                        "</td>"
                    "</tr>"
                })
                $("#contentProducts").html(registro)
            }
        }
    })
}

function getOrders(){
    $.ajax({
        url: "http://129.151.116.250:8080/api/order/all",
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data.length == 0){
                $("#tablaOrd").hide()
                $("#alertareg2").show()
            }else{
                $("#tablaOrd").show()
                $("#alertareg2").hide()
                let registro = ""
                $.each(data, function (index, order){
                    registro += "<tr>" +
                        "<td>" + order.registerDay +
                        "<td>" + order.status + "</td>" +
                        "<td>" + order.salesMan.name + "</td>" +
                        "<td>" + Object.keys(order.products) + "</td>" +
                        "<td>" +
                        "<button class='btn btn-danger btn-sm' onclick=\"deleteOrd('" + order.id + "')\"" +
                            ">Eliminar</button>"
                        "</td>"
                    "</tr>"
                })
                $("#contentOrdenes").html(registro)
            }
        }
    })
}

function ver(reference){
    $("#reference").val(reference)
}

function addOrder(){
    let prod = {
        reference: null,
        name: null,
        category: null,
        description: null,
        availability: null,
        price: null,
        quantity: null,
        photography: null,
        brand: null
    }

    let user = {
        id: null,
        identification: null,
        name: null,
        birthtDay: null,
        monthBirthtDay: null,
        address: null,
        cellPhone: null,
        email: null,
        password: null,
        zone: null,
        type: null
    }

    let order = {
        id: null,
        registerDay: null,
        status: null,
        salesMan: null,
        products: {},
        quantities: {}
    }

    $.ajax({
        type: 'GET',
        url: 'http://129.151.116.250:8080/api/hairproducts/' + $("#reference").val(),
        dataType: 'json',
        success: function(data){
            prod.reference = data.reference
            prod.name = data.name
            prod.category = data.category
            prod.description = data.description
            prod.availability = data.availability
            prod.price = data.price
            prod.quantity = data.quantity
            prod.photography = data.photography
            prod.brand = data.brand

            $.ajax({
                type: 'GET',
                url: 'http://129.151.116.250:8080/api/user/' + localStorage.getItem("IdAse"),
                dataType: 'json',
                success: function(data){
                    user.id = data.id
                    user.identification = data.identification
                    user.name = data.name
                    user.birthtDay = data.birthtDay
                    user.monthBirthtDay = data.monthBirthtDay
                    user.address = data.address
                    user.cellPhone = data.cellPhone
                    user.email = data.email
                    user.password = data.password
                    user.zone = data.zone
                    user.type = data.type

                    var refer = prod.reference

                    order.id = null
                    order.registerDay = new Date()
                    order.status = "Pendiente"
                    order.salesMan = user
                    order.products[refer] = prod
                    order.quantities[refer] = $("#quantity1").val()

                    $.ajax({
                        url: "http://129.151.116.250:8080/api/order/new",
                        type: 'POST',
                        data: JSON.stringify(order),
                        dataType: 'json',
                        contentType: "application/json",
                        complete: function(data){
                            let mensaje = ""
                            if(data.status == "201"){
                                mensaje = "Orden creada exitosamente"
                                getOrders()
                            }else{
                                mensaje = "Ocurrió un problema..."
                            }
                            $("#alerta").show()
                            $("#mensaje").html(mensaje)
                            limpiar()
                        }
                    })
                }
            })
        }
    })
}

function deleteOrd(id){
    console.log(id)
    $.ajax({
        url: "http://129.151.116.250:8080/api/order/" + id,
        type: 'DELETE',
        dataType: 'json',
        success: function (data) {
            getOrders()
        }
    })
}

function limpiar(){
    $("#quantity1").val("")
}

$("#logout").click(function(){
    localStorage.removeItem("IdAse")
    window.location.href = 'index.html';
})
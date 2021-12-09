var endpoint = "http://129.151.116.250:8080/api/user";

$(document).ready(function(){
    $("#alerta").hide()
    getUser()
    getOrders()
})

function getUser() {
    $.ajax({
        url: endpoint + "/" + localStorage.getItem("IdCoord"),
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
                        "<button class='btn btn-success btn-sm' onclick=\"aprobOrder('" + order.id + "')\"" +
                            ">Aprobar orden</button>" +
                        "<td>" + 
                        "<button class='btn btn-danger btn-sm' onclick=\"rejectOrder('" + order.id + "')\"" +
                            ">Rechazar orden</button>" +
                        "<td>" +
                        "<button class='btn btn-warning btn-sm' onclick=\"pendienteOrder('" + order.id + "')\"" +
                        ">Poner en Pendiente</button>" +
                        "</td>"
                    "</tr>"
                })
                $("#contentOrdenes").html(registro)
            }
        }
    })
}

function aprobOrder(id){
    console.log(id)
    $.ajax({
        url: "http://129.151.116.250:8080/api/order/" + id,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            let order = {
                id: data.id,
                registerDay: data.registerDay,
                status: "Aprobada",
                salesMan: data.salesMan,
                products: data.products,
                quantities: data.quantities
            }

            $.ajax({
                url: "http://129.151.116.250:8080/api/order/update",
                type: 'PUT',
                data: JSON.stringify(order),
                dataType: 'json',
                contentType: "application/json",
                success: function (data) {
                    getOrders()
                }
            })
        }
    })
}

function rejectOrder(id){
    console.log(id)
    $.ajax({
        url: "http://129.151.116.250:8080/api/order/" + id,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            let order = {
                id: data.id,
                registerDay: data.registerDay,
                status: "Rechazada",
                salesMan: data.salesMan,
                products: data.products,
                quantities: data.quantities
            }

            $.ajax({
                url: "http://129.151.116.250:8080/api/order/update",
                type: 'PUT',
                data: JSON.stringify(order),
                dataType: 'json',
                contentType: "application/json",
                success: function (data) {
                    getOrders()
                }
            })
        }
    })
}

function pendienteOrder(id){
    $.ajax({
        url: "http://129.151.116.250:8080/api/order/" + id,
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            let order = {
                id: data.id,
                registerDay: data.registerDay,
                status: "Pendiente",
                salesMan: data.salesMan,
                products: data.products,
                quantities: data.quantities
            }

            $.ajax({
                url: "http://129.151.116.250:8080/api/order/update",
                type: 'PUT',
                data: JSON.stringify(order),
                dataType: 'json',
                contentType: "application/json",
                success: function (data) {
                    getOrders()
                }
            })
        }
    })
}

$("#logout").click(function(){
    localStorage.removeItem("IdCoord")
    window.location.href = 'index.html';
})
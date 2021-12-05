var endpoint = "http://129.151.116.250:8080/api/hairproducts";

$(document).ready(function(){
    $("#alerta").hide()
    getProduct()
    $("#actualizar").click(function(){
        if($("#reference").val() == "" || $("#name").val() == "" || $("#category").val() == "" ||
            $("#description").val() == "" || $("#availability").val() == "" || $("#price").val() == "" ||
            $("#quantity").val() == "" || $("#photography").val() == ""){
            alert("Debe ingresar todos los campos...")
        }else{
            putProduct()
        }
    })
})

function getProduct(){
    $.ajax({
        url: endpoint + "/all",
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
                    if(prod.availability == true){
                        registro += "<tr>" +
                            "<td>" + prod.name + "</td>" +
                            "<td>" + prod.category + "</td>" +
                            "<td>" + prod.description + "</td>" +
                            "<td>" + "Si" + "</td>" +
                            "<td>" + prod.price + "</td>" +
                            "<td>" + prod.quantity + "</td>" +
                            "<td>" + prod.photography + "</td>" +
                            "<td>" +
                            "<button class='btn btn-primary btn-sm' data-toggle='modal' data-target='#myModal'" +
                            "onclick=\"ver('" + prod.reference + "','" + prod.name + "','" 
                                            + prod.category + "','" + prod.description + "','" 
                                            + prod.availability + "','" + prod.price + "','" 
                                            + prod.quantity + "','" + prod.photography + "','"
                                            + prod.brand + "')\"" +
                                ">Actualizar</button>" +
                                "<button class='btn btn-danger btn-sm ml-1'  " +
                                "onclick=\"eliminar('" + prod.reference + "')\"" +
                                ">Eliminar</button>" +
                            "</td>"
                        "</tr>"
                    }else{
                        registro += "<tr>" +
                            "<td>" + prod.name + "</td>" +
                            "<td>" + prod.category + "</td>" +
                            "<td>" + prod.description + "</td>" +
                            "<td>" + "No" + "</td>" +
                            "<td>" + prod.price + "</td>" +
                            "<td>" + prod.quantity + "</td>" +
                            "<td>" + prod.photography + "</td>" +
                            "<td>" +
                            "<button class='btn btn-primary btn-sm' data-toggle='modal' data-target='#myModal'" +
                            "onclick=\"ver('" + prod.reference + "','" + prod.name + "','" 
                                            + prod.category + "','" + prod.description + "','" 
                                            + prod.availability + "','" + prod.price + "','" 
                                            + prod.quantity + "','" + prod.photography + "','"
                                            + prod.brand + "')\"" +
                                ">Actualizar</button>" +
                                "<button class='btn btn-danger btn-sm ml-1'  " +
                                "onclick=\"eliminar('" + prod.reference + "')\"" +
                                ">Eliminar</button>" +
                            "</td>"
                        "</tr>"
                    }
                })
                $("#tbody").html(registro)
            }
        }
    })
}

function ver(reference, name, category, description, availability, price, quantity, photography, brand){
    $("#reference").val(reference)
    $("#name").val(name)
    $("#category").val(category)
    $("#description").val(description)
    $("#availability").val(availability)
    $("#price").val(price)
    $("#quantity").val(quantity)
    $("#photography").val(photography)
    $("#brand").val(brand)
}

function putProduct(){
    let product = {
        reference: $("#reference").val(),
        name: $("#name").val(),
        category: $("#category").val(),
        description: $("#description").val(),
        availability: $("#availability").val(),
        price: $("#price").val(),
        quantity: $("#quantity").val(),
        photography: $("#photography").val(),
        brand: $("#brand").val()
    }

    $.ajax({
        url: endpoint + "/update",
        type: "PUT",
        data: JSON.stringify(product),
        dataType: 'json',
        contentType: "application/json",
        complete: function(data){
            console.log(data.status)
            let mensaje = ""
            if (data.status == "201"){
                mensaje = "El producto se actualizó correctamente"
            }else{
                mensaje = "Ha ocurrido un error..."
            }
            $("#alerta").show()
            $("#mensaje").html(mensaje)
            getProduct()
        }
    })
}

function eliminar(reference){
    $.ajax({
        url: endpoint + "/" + reference,
        type: 'DELETE',
        dataType: 'json',
        contentType: "application/json",
        complete: function(data){
            getProduct()
        }
    })
}
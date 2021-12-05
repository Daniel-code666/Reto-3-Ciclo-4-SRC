var endpoint = "http://129.151.116.250:8080/api/hairproducts"

$(document).ready(function(){
    $("#alerta").hide()
    $("#guardar").click(function(){
        if($("#reference").val() == "" || $("#name").val() == "" || $("#category").val() == "" ||
            $("#description").val() == "" || $("#availability").val() == "" || $("#price").val() == "" ||
            $("#quantity").val() == "" || $("#photography").val() == ""){
            alert("Debe ingresar todos los campos...")
        }else{
            postProduct()
        }
    })
})

function postProduct(){
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
        url: endpoint + "/new",
        type: 'POST',
        data: JSON.stringify(product),
        dataType: 'json',
        contentType: "application/json",
        complete: function(data) {
            let mensaje = ""
            if(data.status == "201"){
                mensaje = "Producto creado exitosamente"
            }else{
                mensaje = "Ocurrió un problema..."
            }
            $("#alerta").show()
            $("#mensaje").html(mensaje)
            limpiar()
        }
    })
}

function limpiar(){
    $("#reference").val(""),
    $("#name").val(""),
    $("#category").val(""),
    $("#description").val(""),
    $("#availability").val(""),
    $("#price").val(""),
    $("#quantity").val(""),
    $("#photography").val(""),
    $("#brand").val("")
}
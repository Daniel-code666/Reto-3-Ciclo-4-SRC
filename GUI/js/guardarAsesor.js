var endpoint = "http://129.151.116.250:8080/api/user"
$(document).ready(function () {
    $("#alerta").hide()
    $("#guardar").click(function () {
        if($("#id").val() == "" || $("#identification").val() == "" || $("#name").val() == "" 
            || $("#address").val() == "" || $("#cellPhone").val() == "" || $("#email").val() == ""
            || $("#password").val() == ""){
                alert("Debe ingresar todos los campos...")
        }else{
            let data = {
                email: $("#email").val()
            };

            $.ajax({
                url:"http://129.151.116.250:8080/api/user/emailexist/" + data.email,
                method: "GET",
                dataType: "json",
                success: function(response){
                    console.log(response);

                    if (response == true){
                        alert("El correo ya se encuentra registrado")
                    }else{
                        postClient()
                    }
                }
            });

        }
    })
})

function postClient() {
    let client = {
        id: $("#id").val(),
        identification: $("#identification").val(),
        name: $("#name").val(),
        address: $("#address").val(),
        cellPhone: $("#cellPhone").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        zone: $("#zone").val(),
        type: 'ASESOR'
    }

    console.log(client)

    $.ajax({
        url: endpoint + "/new",
        type: 'POST',
        data: JSON.stringify(client),
        dataType: 'json',
        contentType: "application/json",
        complete: function (data) {
            console.log(data.status)
            let mensaje = ""
            if (data.status == "201") {
                mensaje = "Cliente creado correctamente"
            }else {
                mensaje = "problemas al crear en BD consulte con el Administrador"
            }
            $("#alerta").show()
            $("#mensaje").html(mensaje)
            limpiar()
        }
    })
}


function limpiar() {
    $("#id").val(""),
    $("#identification").val(""),
    $("#name").val(""),
    $("#address").val(""),
    $("#cellPhone").val(""),
    $("#email").val(""),
    $("#password").val(""),
    $("#zone").val("")
}
var endpoint = "http://129.151.116.250:8080/api/user";
$(document).ready(function () {
    $("#alerta").hide()
    getClient()
    $("#actualizar").click(function () {
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
                        putClient()
                    }
                }
            });
        }
    })
})

function getClient() {
    $.ajax({
        url: endpoint + "/all",
        type: 'GET',
        dataType: 'json',
        success: function (data) {
            if (data.length == 0) {
                $("#tabla").hide()
                $("#alertareg").show()
            }else {
                $("#alertareg").hide()
                let registro = ""
                $.each(data, function (index, client) {
                    if (client.type != 'ADMIN'){
                        registro += "<tr>" +
                            "<td>" + client.identification + "</td>" +
                            "<td>" + client.name + "</td>" +
                            "<td>" + client.email + "</td>" +
                            "<td>" + client.type + "</td>" +
                            "<td>" + client.zone + "</td>" +
                            "<td>" +
                            "<button class='btn btn-primary btn-sm' data-toggle='modal' data-target='#myModal'" +
                            "onclick=\"ver('" + client.id + "','" + client.identification + "','" + client.name 
                                            + "','" + client.address + "','" + client.cellPhone + "','" 
                                            + client.email + "','" + client.password + "','" + client.zone 
                                            + "','" + client.type
                                            + "')\"" +
                            ">Actualizar</button>" +
                            "<button class='btn btn-danger btn-sm ml-1'  " +
                            "onclick=\"eliminar('" + client.id + "')\"" +
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

function ver(id, identification, name, address, cellPhone, email, password, zone, type) {
    $("#id").val(id)
    $("#identification").val(identification)
    $("#name").val(name)
    $("#address").val(address)
    $("#cellPhone").val(cellPhone)
    $("#email").val(email)
    $("#password").val(password)
    $("#zone").val(zone)
    $("#type").val(type)
}

function putClient() {

    const perf = $("#type").val();

    if (perf == 'COORD'){
        let client = {
            id: $("#id").val(),
            identification: $("#identification").val(),
            name: $("#name").val(),
            address: $("#address").val(),
            cellPhone: $("#cellPhone").val(),
            email: $("#email").val(),
            password: $("#password").val(),
            zone: $("#zone").val(),
            type: perf
        }

        $.ajax({
            url: endpoint + "/update",
            type: 'PUT',
            data: JSON.stringify(client),
            dataType: 'json',
            contentType: "application/json",
            complete: function (data) {
                console.log(data.status)
                let mensaje = ""
                if (data.status == "201") {
                    mensaje = "Actualizo el usuario con Exito"
                }
                else {
                    mensaje = "problemas al Actualizar en BD consulte con el Administrador"
                }
                $("#alerta").show()
                $("#mensaje").html(mensaje)
                getClient()
            }
        })
    }else{
        let client = {
            id: $("#id").val(),
            identification: $("#identification").val(),
            name: $("#name").val(),
            address: $("#address").val(),
            cellPhone: $("#cellPhone").val(),
            email: $("#email").val(),
            password: $("#password").val(),
            zone: $("#zone").val(),
            type: "ASESOR"
        }

        $.ajax({
            url: endpoint + "/update",
            type: 'PUT',
            data: JSON.stringify(client),
            dataType: 'json',
            contentType: "application/json",
            complete: function (data) {
                console.log(data.status)
                let mensaje = ""
                if (data.status == "201") {
                    mensaje = "Actualizo el usuario con Exito"
                }
                else {
                    mensaje = "problemas al Actualizar en BD consulte con el Administrador"
                }
                $("#alerta").show()
                $("#mensaje").html(mensaje)
                getClient()
            }
        })
    }
}

function eliminar(id) {

    $.ajax({

        url: endpoint + "/" + id,
        type: 'DELETE',
        dataType: 'json',
        contentType: "application/json",
        complete: function (data) {
            getClient()
        }

    })
}
$("#login").click(function(){
    if($("#email").val() == "" || $.trim($("#contrasena").val()) == ""){
        alert("Por favor ingrese el correo y/o la contraseña");
    }else{
        let data = {
            email: $("#email").val(),
            password: $("#contrasena").val()
        };
        $.ajax({
            url:"http://129.151.116.250:8080/api/user/"+data.email+"/"+data.password,
            method: "GET",
            dataType: "json",
            success: function(response){
                console.log(response);
                if (response.id != null){
                    localStorage.setItem("IdUser", response.id)

                    if (response.type == 'COORD'){
                        alert("Bienvenido " + response.name);
                        document.getElementById('email').value = '';
                        document.getElementById('contrasena').value = '';
                        window.location.href = 'coordPage.html';
                    }
                    
                    if (response.type == 'ADMIN'){
                        alert("Bienvenido " + response.name);
                        document.getElementById('email').value = '';
                        document.getElementById('contrasena').value = '';
                        window.location.href = 'userAdmin.html';
                    }

                    if (response.type == 'ASE'){
                        alert("Bienvenido " + response.name);
                        document.getElementById('email').value = '';
                        document.getElementById('contrasena').value = '';
                        window.location.href = 'ordenes.html';
                    }
                    /* alert("Bienvenido " + response.name);
                    document.getElementById('email').value = '';
                    document.getElementById('contrasena').value = '';
                    window.location.href = 'userAdmin.html'; */
                }else{
                    alert("No existe un usuario")

                    /* if (response.type == 'COORD'){
                        alert("Bienvenido " + response.name);
                        document.getElementById('email').value = '';
                        document.getElementById('contrasena').value = '';
                        window.location.href = 'coordPage.html';
                    }
                    
                    if (response.type == 'ADMIN'){
                        alert("Bienvenido " + response.name);
                        document.getElementById('email').value = '';
                        document.getElementById('contrasena').value = '';
                        window.location.href = 'userAdmin.html';
                    }

                    if (response.type == 'ASESOR'){
                        alert("Bienvenido " + response.name);
                        document.getElementById('email').value = '';
                        document.getElementById('contrasena').value = '';
                        window.location.href = 'asesorPage.html';
                    } */
                }
            }
        });
    }
});

$("#registrar").click(function(){
    if($("#emailRegistro").val() == "" || $.trim($("#contrasenaRegistro").val()) == "" || $.trim($("#userRegistro").val()) == "" || $.trim($("#contrasenaRegistro2").val()) == ""){
        alert("Por favor complete todos los campos");
    }else{
        if($("#contrasenaRegistro").val() != $("#contrasenaRegistro2").val()){
            alert("Las contraseñas no coinciden");
        }else{
            let datos = {
                email: $("#emailRegistro").val(),
                password: $("#contrasenaRegistro").val(),
                name: $("#userRegistro").val()
            };
            $.ajax({
                url:"http://129.151.116.250:8080/api/user/new",
                method: "POST",
                dataType: "json",
                data: JSON.stringify(datos),
                contentType: "application/json",
                Headers: {
                    "Content-Type": "application/json"
                },
                statusCode: {
                    201: function(response){
                        console.log(response);

                        if (response.id == null){
                            alert("Correo ya registrado, intente con uno nuevo...");
                        } else {
                            alert("¡Registro exitoso!");
                            document.getElementById('emailRegistro').value = '';
                            document.getElementById('userRegistro').value = '';
                            document.getElementById('contrasenaRegistro').value = '';
                            document.getElementById('contrasenaRegistro2').value = '';
                        }
                    },
                    400: function(response){
                        alert("Algo salió mal...");
                        console.log("Bad Request");
                    }
                }
            });
        }
    }
});

$("#contrasenaRegistro2").change(function(){
    if($("#contrasenaRegistro").val() != $("#contrasenaRegistro2").val()){
        $("#contrasenaRegistro2").css("border-color", "red");
        $("#contrasenaRegistro").css("border-color", "red");
    } else {
        $("#contrasenaRegistro2").css("border-color", "");
        $("#contrasenaRegistro").css("border-color", "");
    }
});
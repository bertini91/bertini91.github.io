function revisar(input){
    if(input.value == ""){
        input.className = "form-control is-invalid";
        return false;
    }else{
        input.className = "form-control is-valid";
        return true;
    }
}

function validarCorreo(inputCorreo){
    let expresion = /\w+@\w+\.[a-z]{2,}$/;
    if(revisar(inputCorreo)== true && expresion.test(inputCorreo.value)){
        inputCorreo.className = "form-control is-valid";
        return true;
    }else{
        inputCorreo.className = "form-control is-invalid";
        return false;
    }
}

function validarConsulta(inputConsulta){
    if(revisar(inputConsulta) == true && inputConsulta.value.length >= 10){
        return true;
    }else{
        return false;
    }
}

function validarFormulario(e){
    e.preventDefault();
    console.log("Se ejecuto validar!"+e);

    if(revisar(document.getElementById('inputNombre'))&&
        validarCorreo(document.getElementById('inputCorreo'))&&
        validarConsulta(document.getElementById('inputConsulta'))){
        
            enviarEmail();
    }else{
        alert("Hay un error en el formulario!");
    }
}

function enviarEmail(){
    let template_params
    if(document.getElementById("inputTelefono").value==""){
        template_params = {
            "reply_to": "reply_to_value",
            "from_name": document.getElementById("inputNombre").value,
            "to_name": "to_name_value",
            "message_html": `Mensaje: ${document.getElementById("inputConsulta").value}. \n
                            - Email: ${document.getElementById("inputCorreo").value}.`
        }
    }else{
        template_params = {
            "reply_to": "reply_to_value",
            "from_name": document.getElementById("inputNombre").value,
            "to_name": "to_name_value",
            "message_html": `Mensaje: ${document.getElementById("inputConsulta").value}. \n
                            - Email: ${document.getElementById("inputCorreo").value}. \n
                            - Telefono ${document.getElementById("inputTelefono").value}.`
        }
    }

    let service_id = "default_service";
    let template_id = "template_r7VIa09F";

    emailjs.send(service_id, template_id, template_params).then(
        function (response){
            console.log("Respuesta cuando se envio correctamente"+response);
            alert("Muchas gracias. Me pondré en contacto con usted a la brevedad. Atte. Nicolás Bertini");
            window.history.back();
            
        }, function (error){
            console.log("Se produjo un error "+error);
            alert(`Su consulta NO fue enviada correctamente por problemas de conexion. Lo solucionaré a la brevedad. Atte. Nicolas Bertini.`);
        }
    );
}
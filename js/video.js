$(document).ready(function(){
    let nameVideo = localStorage.getItem("namesg");
    let usersGlobal = localStorage.getItem("userGlobal");
    let buttonProcess2= `<button  class="waves-effect waves-light btn btn-process yellow">En proceso</button>`
    $('#btn2').append(buttonProcess2);
    let templateVideo= `<h5 class="center-align ">¡Muy bien, ${nameVideo}!</h5>
    <p class="">Nos gusta tu determinación, por esa razón el equipo de GMD, quiere seguir 
    conociéndote.
     Ahora tiene un nuevo reto, es muy importante que te sientas cómoda</p>
     <p class="center-align">Graba un video y cuéntanos sobre ti</p>
     <img class="responsive-img" src="../assets/img/video.PNG" alt="video">
     
     <div class="row">
     <div class="col s12 m6 offset-m3">
     <h5 class="center-align ">Ingresa el link de tu video</h5>
     <input id="link" type="text">
     <div id="resultado"></div>
     <div class="row">
     <div class="col s6 offset-s4 m6 offset-m3">
     <button  id="save-video" disabled="true" data-target="thanks"  class=" btn modal-trigger blue-low"  >Guardar</button> 
     </div>
     </div>
    
     </div>
    </div>
    
     
     `
    $('#video').append(templateVideo);

    $("#link").on('input', validar);
    //$("#link").on('keydown', validar);
    function validar(event){
        //event.preventDefault()
        var texto=$('#link').val();
        var reg= /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \?=.-]*)*\/?$/   
        if(reg.test(texto)) { 
            //let result= `Resultado <br>'+${texto}`;
           // $("#resultado").append(result);
            $("#save-video").removeAttr('disabled');
               } else { 
                   let noResult = `<br>No valida`;
                   //$("#resultado").append(noResult);
                   $("#save-video").attr('disabled', true);
           
           } 

           $("#save-video").on('click', saveLinks);   
           function saveLinks(event){
            event.preventDefault();
          
            firebase.database().ref('links/' + usersGlobal).update(
                links={
                    url:$(link).val(),
                    name: usersGlobal,
                    nombre: nameVideo
                }
             )
              let thanksTemplate= `  <div id="thanks" class="modal white">
              <div class="modal-content">
                <h6 class="center-align">Tu primera fase de postulación acaba de finalizar</h6>
                <img class="responsive-img" src="../assets/img/correo.PNG" alt="correo">
             
                <a href="../index.html" class=" waves-effect waves-green ">Volver al inicio</a>
              </div>
             
            </div>`
            $('#video').append(thanksTemplate);
            $('.modal').modal();

           }
          
    }
    //alert('ddd')
  /*$('#btn-process').removeClass( "gray" )*/
//localStorage.getItem("process1").addclass('yellow')
    
})
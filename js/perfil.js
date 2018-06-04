$(document).ready(function(){
  $('select').formSelect();
  $('.tabs').tabs();
  $('.datepicker').datepicker({
    firstDay: true, 
            format: 'yyyy-mm-dd',
            i18n: {
                months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
                monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Dic"],
                weekdays: ["Domingo","Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"],
                weekdaysShort: ["Dom","Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
                weekdaysAbbrev: ["D","L", "M", "M", "J", "V", "S"]
            }
  });
/*incializando */
var config = {
    apiKey: "AIzaSyDdXkiM8c_LdEJVT6OeyEIfOQ2N7k0sjRU",
    authDomain: "seleccion-gmd.firebaseapp.com",
    databaseURL: "https://seleccion-gmd.firebaseio.com",
    projectId: "seleccion-gmd",
    storageBucket: "seleccion-gmd.appspot.com",
    messagingSenderId: "246386059278"
  };
  firebase.initializeApp(config);

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      let usuario = user.uid;
      localStorage.setItem("userGlobal", usuario);
      console.log(usuario)
      window.localStorage.setItem('storageUID', user.uid);
      var UID = window.localStorage.getItem('storageUID');
      /*usuario */
      console.log(user)
      let objectUsers = {
        uid: user.uid,
        name: user.displayName,
        mail: user.email,
        photo: user.photoURL,
        //universidad: $('#univ').val()
      }
      /*Creando la rama usuarios en firebase */
      var firebasePostREsfName = firebase.database().ref('usuarios').child(objectUsers.uid);
      /* incorporando datos en la rama según el usuario que ingrese */
      firebasePostREsfName.set(objectUsers);
      /*incorporando foto */
      let name = objectUsers.name.split(" ")[0];
      localStorage.setItem("namesg", name);
      let photo = ` <img src="${objectUsers.photo}" alt="" class="img-profile">`;
      let fullName =  `<p class="center-align">${objectUsers.name}</p>`;
      let mail = `<h8 class="center-align mg-top correo">${objectUsers.mail}</h8>`;
      console.log(fullName)
      let greeting = `<h5 class="center-align white-text">Hola, ${objectUsers.name.split(" ")[0]}</h5>`;
      let btnProcess = `<button id="btn-process" class="waves-effect waves-light btn gray btn-process"> En proceso</button>`
      $('#root').append(greeting);
      $('#root').append(photo);
      $('#box-btn').append(btnProcess);
      $('#img-profile').append(photo);
      $('#img-profile').append(fullName);
      $('#img-profile').append(mail);
      let process = $('#btn-process').attr('id');
      console.log(process)
      /*localStorage.setItem("process1", "btnProcess");
      localStorage.setItem("process1", "btnProcess");
    
      $('#contacto').on('submit', function(e) {
        e.preventDefault();
      })
      /*validando el formulario */
      /*campo con frases de letras*/
      let namePattern ="^[a-zA-Z ]+$";
      /*campo para validar  */
      let filePattern =/(.pdf)$/i;
      /*validar número de celular */
      let phonePattern =  "^([0-9]+){9}$";
      let phone = /^[0-9]*$/;
      let datePattern = /^([012][1-9]|3[01])(\/)(0[1-9]|1[012])\2(\d{4})$/;
      let dniNumber = /^[0-9]{8}$/;
      let empty = /^\s*$/;
      /*validando inputs*/ 
      function checkInput(idInput, pattern) {
        return $(idInput).val().match(pattern) ? true : false;
      }
     /* function checkNumber(){
        var restriction = /^[0-9]*$/;
        if (($('#celular').val().length) === 9 && restriction.test($('#celular').val())) {
          console.log('es un numero')
        }
      }*/
      /*validando el selector*/ 
      function checkSelect(idSelect) {
        return $(idSelect).val() ? true : false;
        let valor =$(idSelect).val();
        console.log(valor)
      }
      /*validano campos de check */
      function checkRadioBox(nameRadioBox) {
        return $(nameRadioBox).is(":checked") ? true : false;
      }
      
      /*habilitando botón de enviar*/ 
      function enableSubmit (idForm) {
        $(idForm + " #enviar").removeAttr("disabled");
      }
      /*función que desabilita botón*/ 
      function disableSubmit (idForm) {
        $(idForm + " #enviar").attr("disabled", "disabled");
      }
      /*función para validar el formulario*/ 
      function checkForm (idForm) {
        //let $letter = $('#univ, #city');
        $(idForm + " *").on(" change  keyup", function() {
          if ( checkInput("#dni", dniNumber)&& checkInput("#celular", phonePattern)
          && (checkInput("#univ", namePattern) ||checkInput("#instituto", namePattern))
          &&(checkInput("#career", namePattern) ||checkInput("#career-tec", namePattern))
          &&(checkSelect("#grado",namePattern)||checkSelect("#grado-tec",namePattern))
          && checkInput("#company", namePattern)&& checkInput("#cargo", namePattern)&& checkInput("#resum", namePattern)
          && checkRadioBox("[name=competencia]")&& checkInput("#melif", filePattern)
          /*checkInput("#celular", phone)&& checkInput("#univ", namePattern)&& 
          checkInput("#dni", dniNumber)&& checkInput("#celular", phonePattern) && 
          (checkInput("#univ", namePattern) ||checkInput("#instituto", namePattern))
          &&(checkInput("#career", namePattern) ||checkInput("#career-tec", namePattern))
          &&(checkSelect("#grado",namePattern)||checkSelect("#grado-tec",namePattern))
          && checkInput("#company", namePattern)&& checkInput("#cargo", namePattern)&& checkInput("#resum", namePattern)
          && checkRadioBox("[name=competencia]")*//*&& checkInput("#files", filePattern)*/
          /*checkInput("#celular", phonePattern)*//*checkInput("#univ", namePattern) 
          ||checkInput("#instituto", namePattern)/*&& checkInput("#career", namePattern)&& 
         checkSelect("#grado")&& checkInput("#company", namePattern)
         && checkInput("#resum", namePattern)&& 
        checkRadioBox("[name=competencia]")&& checkInput("#files", filePattern)*/)
        {
          enableSubmit(idForm);
        } else {
          disableSubmit(idForm);
        }
        
        });
      }
      
      $(function() {
        checkForm("#contacto");
       
      });
      
/*Guardando cvs */
let storageService = firebase.storage();
/*var referencia = storageService.ref();
var referencia = referencia.child('cv');
var uploadTask = referencia.put(file, metadata);*/
$('#melif').on('change', function(evento){
  console.log('holis')
  //var archivo = $('#fichero').prop('files')[0];
 //evento.preventDefault();
 var archivo  = evento.target.files[0];
 console.log(archivo)
 subirArchivo(archivo);
});

function subirArchivo(archivo) {
 // creo una referencia al lugar donde guardaremos el archivo
 var refStorage = storageService.ref('micarpeta').child(archivo.name);
 // Comienzo la tarea de upload
 var uploadTask = refStorage.put(archivo);

 // defino un evento para saber qué pasa con ese upload iniciado
 uploadTask.on('state_changed', null,
   function(error){
     console.log('Error al subir el archivo', error);
   },
   function(){
     console.log('Subida completada');
     mensajeFinalizado(uploadTask.snapshot.downloadURL, uploadTask.snapshot.totalBytes);
   }
 );
}
function mensajeFinalizado(url, bytes) {
 var elMensaje = $('#mensaje');
 var textoMensaje = `<p>Hay un archivo</p>`
/*textoMensaje += '<br>Bytes subidos: ' + bytes;
 textoMensaje += '<br><a href="' + url + '">Ver el fichero</a>'*/
 elMensaje.append(textoMensaje);
}
/*$("input[name=compentencia]").on('input', function(){

  alert('gdgd')
   var habilidades = new Array();
   $("input[name=compentencia]").each(function (index) { 
      if($(this).is(':checked')){
       habilidades.push($(this).val());
       console.log(habilidades)
      }
     })
   })
*/
     var $UID = window.localStorage.getItem('storageUID');
     console.log($UID );
      /*enviando el formulario a firebase */
      $('#enviar').on('click', function(event) {
        
        event.preventDefault();
       let compt1 = $("#work:checked").val()
       let compt2 = $("#resilencia:checkbox:checked").val()
        
        //firebase.database().ref('formulario/' + $UID).update
        firebase.database().ref('formul/' + usuario).update(
          objectFormul = {
            nombre:objectUsers.name,
            dni: $('#dni').val(),
            celular: $('#celular').val(),
            nacimiento:$('#nacimiento').val(),
            /*estudios en la universidad */
            universidad: $('#univ').val(),
            carrera: $('#career').val(),
            grado: $('#grado').val(),
            inicioEstudios:  $('#inicio').val(),
            finalEstudios: $('#final').val(),
            stateStudy: $('#state-study').val(),
            /*Estudios técnicos */
            instituto:$('#instituto').val(),
            carreraTec:$('#career-tec').val(),
            inicioTec:$('#inicio-tec').val(),
            finalTec:$('#final-tec').val(),
            gradoTec:$('#grado-tec').val(),
            
            

            /*Experiencia */
            empresa: $('#company').val(),
            inicioEmpresa: $('#start').val(),
            finalEmpresa: $('#end').val(),
            cargo: $('#cargo').val(),
            resum:$('#resum').val(),
           competencia1: compt1, 
           /* competencia2: compt2 /* 
            competencia3: $( "#organz:checked" ).val(), */
          }
        )
        /*.catch(function (err) {
          console.log('está fallando', err);
         });*/
           


         let templateSave= ` <div id="modal4" class="modal ">
         <div class="modal-content white">
           <h4 class="indigo-text text-darken-4 center-align">Registro exitoso</h4>
           <img src="../assets/img/check.PNG" alt="" class="responsive-img center-block">
         </div>
         <div class="modal-footer white ">
         <a id="check" class="blue-low modal-close waves-effect waves-green btn-flat modal-trigger white-text" href="#question">ir</a>
       </div>
       </div>`
       $("#save").append(templateSave);
       $('.modal').modal();

       $("#check").on('click', function(){
       
        let questionTemplate= `<div id="question" class="modal">
        <p class=" center-align indigo darken-4 white-text">A continuación, responde las siguientes preguntas</p>
        <div class="modal-content ">
         
          <div class="row">
          <div  class="col s11 offset-s1">
          <ol id="" class="indigo-text text-darken-4">
          
          <li>
          <p>¿Cuántos años de experiencia tiene un controlador de tickets?</p>
          
          <div class="row ">
          <div class="col s12 m6 ">
         
          <p>
            <label>
              <input id="first-option" type="checkbox" name="question1" value="0 años" class="micheckbox"/>
              <span class="indigo-text text-darken-4">0 años</span>
            </label>
          </p>
          <p>
            <label>
              <input id="second-option" type="checkbox" name="question1" value="0 a 1 año" />
              <span class="indigo-text text-darken-4">0 a 1 año</span>
            </label>
          </p>
          </div>
          <div class="col s12 m6">
          <p>
            <label>
              <input id="" type="checkbox" name="question1" value="1 año a 3 años"/>
              <span class="indigo-text text-darken-4">1 año a 3 años</span>
            </label>
          </p>
          <p>
            <label>
              <input id="" type="checkbox" name="question1" value="3 años a más" />
              <span class="indigo-text text-darken-4">3 años a más</span>
            </label>
          </p>
          </div>
          </div>
          </li>
          <li>
          <p>¿Selecciona cuáles son tus competencias?</p>
          
          <div class="row ">
          <div class="col s12 m6 ">
          <p>
            <label>
              <input id="" type="checkbox" name="question2" value="trabajo en equipo"/>
              <span class="indigo-text text-darken-4">trabajo en equipo</span>
            </label>
          </p>
          <p>
            <label>
              <input id="" type="checkbox" name="question2" value="resilencia" />
              <span class="indigo-text text-darken-4">resilencia</span>
            </label>
          </p>
          <p>
          <label>
            <input id="" type="checkbox" name="question2" value="Organización" />
            <span class="indigo-text text-darken-4">Organización</span>
          </label>
        </p>
        <p>
        <label>
          <input id="" type="checkbox" name="question2" value="Creatividad e innovación" />
          <span class="indigo-text text-darken-4">Creatividad e innovación</span>
        </label>
      </p>
          </div>
          <div class="col s12 m6 ">
          <p>
            <label>
              <input id="" type="checkbox" name="question2" value="Capacidad de análisis de datos"/>
              <span class="indigo-text text-darken-4">Capacidad de análisis de datos</span>
            </label>
          </p>
          <p>
            <label>
              <input id="" type="checkbox" name="question2" value="Habilidad para tomar decisiones" />
              <span class="indigo-text text-darken-4">Habilidad para tomar decisiones</span>
            </label>
          </p>
          <p>
          <label>
            <input id="" type="checkbox" name="question2" value="Orientación al cliente" />
            <span class="indigo-text text-darken-4">Orientación al cliente</span>
          </label>
        </p>
        <p>
        <label>
          <input id="" type="checkbox" name="question2" value="Comunicación efectiva" />
          <span class="indigo-text text-darken-4">Comunicación efectiva</span>
        </label>
      </p>
          </div>
          </div>
          </li>
          <li>
          <p>¿Cuáles son tus expectativas salariales?</p>
          
          <div class="row ">
          <div class="col s12 m6 ">
          <p>
            <label>
              <input id="" type="checkbox" name="question3" value="S/.950 a s/. 1500"/>
              <span class="indigo-text text-darken-4">S/.950 a s/. 1500</span>
            </label>
          </p>
          <p>
            <label>
              <input id="" type="checkbox" name="question3" value="S/.1501 a s/. 1500" />
              <span class="indigo-text text-darken-4">S/.1501 a s/. 1500</span>
            </label>
          </p>
          </div>
          <div class="col s12 m6">
          <p>
            <label>
              <input id="" type="checkbox" name="question3" value="S/.1501 a s/. 1500"/>
              <span class="indigo-text text-darken-4">S/.1501 a s/. 1500</span>
            </label>
          </p>
          <p>
            <label>
              <input id="checkbox" type="checkbox" name="question3" value="S/.1508 a s/. 1500" />
              <span class="indigo-text text-darken-4">S/.1508 a s/. 1500</span>
            </label>
          </p>
          </div>
          </div>
          </li>
        </ol>
        <div class="col s6 offset-s3 m6 offset-m4">
        <button id="env" disabled="true" data-target="modal9" class="btn waves-effect blue-low waves-light modal-trigger " type="submit" >Enviar</button>
        
       
        </div>
       
          </div>
        </div>
     
        </div>
     
      </div>`;
      $("#save").append(questionTemplate);
      $('.modal').modal();

     /*validando las preguntas */
      $("input[type=checkbox]").change(function() {  
        if(($("input[name=question1]")&& ($("input[name=question2]"))&& ($("input[name=question3]"))).is(':checked')) {
          console.log('esta seleccionado');
          //console.log($("input[name=question1]").val());
          $('#env').removeAttr('disabled');
          //$('#env').attr('disabled', 'false');
          //$('#env').addClass('btn-enabled');
        } else { 
          $('#env').attr('disabled', true); 
            //alert("No está activado");  
        }
      }); 
      /*$()
      let check = $('input[name="question1"]').val();
      console.log(check);*/
      $('#env').on('click', surprise);
      $('#env').on('click', recorrerDiasSemana);
      function recorrerDiasSemana(){
        //alert('dd')
        var listaDias = new Array();
        $("input[name=question1],input[name=question2],input[name=question3").each(function (index) { 
           if($(this).is(':checked')){
              listaDias.push($(this).val());
              console.log(listaDias);
              console.log(listaDias[0]);
              let firstOption = listaDias[0];
              console.log(firstOption);
              let secondOption = listaDias[1];
              console.log(secondOption);
              let thirdOption = listaDias[2];
              console.log(thirdOption);
              /*firebase.database().ref('preguntas/' + usuario).update(
                objectQuestion = {
                 
                  melo: listaDias[1],
                 
                  
                  
                }) */
           }
           firebase.database().ref('preguntas/' + usuario).update(
            objectQuestion = {
             
              preguntas: listaDias
             
              
              
            })

 
           
        });
        return listaDias;
        
      }

      function surprise(){
        /*firebase.database().ref('preguntas/' + usuario).update(
          objectQuestion = {
            nombre:objectUsers.name,
            primeraPregunta: $('#first-option').val(),
            primeraPregunta: $('#second-option').val()
          }
         
        ) */
        //alert('ddhd');
     
       
        /* */
        let congratulationsTemplate = `<div id="modal9" class="modal white">
        <div class="modal-content indigo-text text-darken-4 center-align">
          <h4 class="">Bravo</h4>
          <img src="../assets/img/congratulations.PNG" alt="bravo" class="responsive-img center-block">
          <p class="">Tenemos una sorpresa para ti</p>
          <button id="ok"  class="blue-low waves-effect waves-light btn mg-top">Ok</button>
        </div>
        <div class="modal-footer white">
         
        </div>
      </div>`
     
      $("#save").append(congratulationsTemplate);
      $('.modal').modal();
     
    

      $('#ok').on('click', video);
      function video(event){
        event.preventDefault()
        //alert('hola')
        window.location.href = '../views/video.html';
        
        //localStorage.getItem("process1").addclass('yellow');
        //$("#btn-process").removeClass('gray');
        //$('#btn-process').remove()
      }
    }

        //alert('Datos guardados satisfactoriamente');
        /*limpiando los campos */
        $('#univ').val('')
        //window.location.href = '../views/prueba.html';

      
      })
      /*termina el if */
    
  
    
    
    
    
  });
     
    }
  
  
    });
});
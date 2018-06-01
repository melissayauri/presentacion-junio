$(document).ready(function() {
  $('.modal').modal();
  /* variable para el buscador*/
  let $searchInput = $('#search');
  /* validando el ingreso del buscador */
  $($searchInput).on('keyup', function() {
    let name = $(this).val().toLowerCase(); 
    console.log($(this).val());
    $('.cards-js').hide();
    $('.cards-js').each(function() {
      if ($(this).attr('id').toLowerCase().indexOf(name) !== -1) {
        $(this).show();
      }
    }); 
  });
  /* Colocando la data de los trabajos */
  var $container = $('.container-js');
  console.log($container);
  console.log(DATA);
  for (let i = 0; i < DATA.length; i++) {
    console.log(DATA[i])
    $('.collapsible').collapsible();
    let ref = DATA[i];
    console.log(ref);
    /* Creando los bloques con información de trabajo */
    let template = `<li class="cards-js "  id="${ref.cargo}">
                        <div class="collapsible-header indigo-text text-darken-4 ">
                            <i class="material-icons indigo-text text-darken-4">filter_drama</i>
                            ${ref.cargo}-${ref.ubicacion}
                            <span data-target="modal2" class="badge btn-badge  blue  white-text btn-post modal-trigger" id="${[i]}">
                            Postular
                        </span>
                        </div>
                        <div class="collapsible-body justify" id="prueb">
                            <span class="indigo-text text-darken-4 ">${ref.funciones}</span>
                        </div>
                    </li>`;
    $container.append(template);
  

  var $containerPost = $('.container-post');
  let $postular = $('.btn-post');
  $postular.on('click', postular);
  function postular() {
  $('.modal').modal();
  
    if ($(this).attr('id')) {
      //console.log($(this).attr('id'))
      let atributo = $(this).attr('id');
      console.log(atributo);
      //alert('hdid')
    

      //$( "#prueb" ).removeClass( "collapsible-body" )
      let templatePostul = `<div id="modal2" class="modal white ">
      <div class="modal-content ">
      <div class="container">
      <div class="row">
      <div class="col s8">
      <h6 class="indigo-text text-darken-4 center-align ">Para que puedas postular</h6>
      <h5 class="indigo-text text-darken-4 center-align">Primero debes registrate</h5>
      </div>
      <div class="col s4">
      <img src="../assets/img/ir-formul.PNG" alt="ir-formul" >
      
    </div>
    </div>
    </div>
    </div>
    </div>`

    $containerPost.append(templatePostul);

    $(this).addClass("gray");
    $(this).attr("disabled", "disabled");

    































    }
   
    
  }
 }
 
});
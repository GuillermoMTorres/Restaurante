var tipoComida = [];
var checkout = [];

$('#page1Content').show();

function isEven(n) {
   return n % 2 == 0;
}

function isOdd(n) {
   return Math.abs(n % 2) == 1;
}
/*
$.getJSON("https://www.ponyville.es/shits/test.json", function(json) {
    console.log(json); // this will show the info it in firebug console
});

*/
    var url = window.location.href;
    var inicio = url.indexOf('8000/') + 5;
    var final = url.indexOf(".",18);
    var menuActivo = url.substring(inicio,final);
    $("#" + menuActivo + "li").toggleClass("menuhover");

    console.log(menuActivo);
    $.getJSON("http://localhost:8000/Funciones/test2.json", function(data){
      menu = data;

    menu.comidas.forEach(function(element) {
    
      var  temp = element.Categoria;

        if(tipoComida.indexOf(temp) == -1){
          tipoComida.push(temp);
        }

    });

    tipoComida.push('Checkout');

  tipoComida.forEach(function(element,i) {
      
    elemento = jQuery('<h2/>', {
        class: 'menuCategory ',

        text: element
    })

      div =  jQuery('<div/>', {
        class: 'qwe',
        id: element.replace(' ', ''),
    })

    elemento.appendTo('#page'+(i+1)+'Content');
    div.insertAfter(elemento);
  });


  var contador = 0;

  menu.comidas.forEach(function(element) {

      div = jQuery('<div/>', {
          id: 'comida' + contador,
          class: 'comida',
          onclick: 'addOrder(this)'
      })

        var precio = jQuery('<p/>', {
        class: 'precioComida ',
        text: element.Precio + '€'
      })

      var nombre = jQuery('<h4/>', {
        class: 'nombreComida ',
        text: element.Nombre
      })

      var descripcion = jQuery('<p/>', {
        class: 'descripcionComida ',
        text: element.Descripcion
      })

      var img = jQuery('<img/>', {
        class: 'imgComida ',
        src: 'Imagenes/' + element.Foto
      })

      var etiqueta = jQuery('<div/>', {
        class: 'etiquetaComida',
      })


      div.appendTo('#' + element.Categoria.replace(' ', ''));
      img.appendTo('#comida' + contador);
      etiqueta.appendTo('#comida' + contador);
      precio.appendTo(etiqueta);
      nombre.appendTo('#comida' + contador);
      descripcion.appendTo('#comida' + contador);

      div = jQuery('<p/>', {
          class: 'clear'
      })

      div.insertAfter('#page'+(contador+1)+'Content');
      contador++;
  });


}); 

function addOrder(comida){

    if(document.getElementById("orderDescription")){
        document.getElementById("orderDescription").remove();
    }
    var test = jQuery('<div/>', {
      class: 'test2',
    })
    test.appendTo(comida);
    test.animate({
      left: ($('#order').offset().left - test.offset().left) + 150, 
      top: ($('#order').offset().top - test.offset().top) + 70 },
      "slow", function() {
    test.remove();
  });
  var nombre = comida.childNodes[2].innerHTML;
  var precio = comida.childNodes[1].childNodes[0].innerHTML
  var cantidad = 1;
  var encontrado = false;

  if (checkout.length == 0){
    checkout.push([nombre,precio,cantidad]);
  }else{
    checkout.forEach(function(element) {
      console.log(element[0] + "   " + nombre)
      if(element[0] == nombre){
          element[2] = parseInt(element[2]) + 1;
          element[1] = (parseInt(element[1]) + parseInt(precio)) + "€";
          encontrado = true;
      }

    });
    if(!encontrado){
      checkout.push([nombre,precio,cantidad])
    }
    console.log(checkout)
  }
  printCheckout();
}

function printCheckout(){
  var totalPrice = 0;
  var div;
  document.getElementById("orderContainer").innerHTML ="";
  
  if(document.getElementById('orderFoodTP')){
    document.getElementById("orderFoodTP").innerHTML ="";
  } 
  
  checkout.forEach(function(element, i) {

    if(isEven(i)){
      div = jQuery('<div/>', {
        class: 'orderFood',
      })
      }else{
      div = jQuery('<div/>', {
      class: 'orderFoodAlt',
      })
    }

    var precio = jQuery('<p/>', {
      class: 'OrderFoodPrice',
      text: element[1]
    })
    var nombre = jQuery('<p/>', {
      class: 'OrderFoodName',
      text: element[0]
    })
    var quantity = jQuery('<input/>', {
      class: 'OrderFoodQuantity',
      value: element[2],
      type: 'number',
      onchange: 'changeQuantity(this)'
    })
    var redCross = jQuery('<div/>', {
      class: 'deleteOrder',
      onclick: 'deleteOrder(this)'
    })

    div.appendTo('#orderContainer');
    nombre.appendTo(div);
    quantity.appendTo(div);
    precio.appendTo(div);
    redCross.appendTo(div);
    totalPrice = totalPrice + parseInt(element[1])
  });

  var labelTP = jQuery('<p/>', {
    class: 'OrderTotalPrice',
    text: 'El precio total es: ' + totalPrice + "€" 
  })
  var labelBtn = jQuery('<button/>', {
    class: 'btn btn-sucess checkout',
    text: 'Checkout' 
  })

  if(!document.getElementById('orderFoodTP')){
  
    div = jQuery('<div/>', {
        id: 'orderFoodTP',
    })
    div.appendTo('#order')
    
    labelTP.appendTo(div);
    labelBtn.appendTo(div);
    }else{

    labelTP.appendTo('#orderFoodTP');
    labelBtn.appendTo('#orderFoodTP');
    }
}

function changeQuantity(input){
  name = input.parentNode.childNodes[0].innerHTML
  quantity = input.value;
  if(quantity == 0){
        removeItemOrder(name);     
  }else{
  checkout.forEach(function(element, i) {
      if(element[0] == name){
          var precio = (parseInt(element[1]) / parseInt(element[2]));
          element[2] = quantity;
          element[1] = (parseInt(precio) * parseInt(quantity)) + "€";
      }
  });
  }
  printCheckout();
}

function removeItemOrder(name){
    checkout.forEach(function(element, i) {
      if(element[0] == name){
          checkout.splice(i,1);
      }
    });
}
function deleteOrder(removal){
  name = removal.parentNode.childNodes[0].innerHTML;
  removeItemOrder(name);
  printCheckout();
}

$(document).ready(function(){
    $("#test").click(function(){
        $("#test").click(function(){
            var div = $("#test");
            div.animate({left: '300px', top: '100px'}, "slow");
            div.animate({left: '400px', top: '300px'},"slow");
            div.animate({left: '500px', top: '200px'}, "slow");
            div.animate({left: '600px', top: '300px'}, "slow", function() {

            alert("animacion terminada");
            });
        }); 
    });
});

(function($) {
    var element = $('#order'),
        originalY = element.offset().top;

    // Space between element and top of screen (when scrolling)
    var topMargin = 250;

    // Should probably be set in CSS; but here just for emphasis
    element.css('position', 'absolute');

    $(window).on('scroll', function(event) {
        var scrollTop = $(window).scrollTop();

        element.stop(false, false).animate({
            top: scrollTop < originalY
                    ? topMargin
                    : scrollTop - originalY + topMargin
        }, 700, 'easeOutCirc');
    });
})(jQuery);
/*
function addOrder(comida){

		if(document.getElementById("orderDescription")){
				document.getElementById("orderDescription").remove();
		}

	var nombre = comida.childNodes[2].innerHTML;
  var precio = comida.childNodes[1].innerHTML;
  var cantidad = 1;

  checkout.push([nombre,precio,cantidad])
}
  checkout.forEach

  if(document.getElementsByClassName("nombreOrderComida").length !=0){

    var orderNames = document.getElementsByClassName("nombreOrderComida");
    var cont = 0;
    var encontrado = "";
    orderNames.forEach(function(element) {

    if(element == nombre){
        encontrado = nombre;
    }else{
          cont++;
    }

    });

    if(encontrado != ""){
       
       var childs = document.getElementById("order").childNodes

         childs.forEach(function(element) {

            if(element.innerHTML == encontrado){
                
          }});

    }


  }

	var precio = comida.childNodes[1].innerHTML
  console.log(comida.childNodes[1].innerHTML);
	var index = precio.indexOf('€');
  precio = precio.substring(0, index);
  console.log(precio);
	  var precioP = jQuery('<p/>', {
      class: 'precioOrderComida',
      text: precio + '€'
 	  })
 	  var nombreP = jQuery('<p/>', {
      class: 'nombreOrderComida',
      text: nombre
 	  })
    var cantidad = jQuery('<p/>', {
      class: 'cantidadOrderComida',
      text: 'x' + 1
    })
    cantidad.appendTo('#order');
	  nombreP.appendTo('#order');
	  precioP.appendTo('#order');
    jQuery('<hr/>', {
    }).appendTo('#order');

}
*/
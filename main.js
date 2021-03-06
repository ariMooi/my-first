function showItems(){
  var items=document.getElementById('listFruit')
  items.style.display="block";
  document.getElementById('icon_lupa').style.display="none"
}

function validar(e) {
  tecla = (document.all) ? e.keyCode : e.which;
  if (tecla==13){
   //aqui va el codigo para buscar
    addFruit()
  }
}

var frutas = [
  "manzana",
  "pera",
  "fresa",
  "mango",
  "kiwi",
  "cereza",
  "platano",
  "uvas"
]

function listFruit(fruta){
  var ul = document.getElementById("listFruit")
  var li = document.createElement("li")
  li.appendChild(document.createTextNode(fruta))
  li.setAttribute("class", "list-group-item item")
  var a = document.createElement("a")
  a.appendChild(document.createTextNode("Eliminar"))
  a.setAttribute("href", "#")
  a.setAttribute("class", "eliminar")
  a.setAttribute("onclick", "deleteFruit('"+ fruta +"')")
  li.appendChild(a)
  ul.appendChild(li)
}

function deleteFruit(fruta){
  var ul = document.getElementById("listFruit");
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild)
  }
  frutas = frutas.filter( f => {
    return f != fruta
  })
  frutas.map(f => { listFruit(f) })
}

function addFruit(){
  var newF = document.getElementById("newFruit").value
  frutas.push(newF)
  var ul = document.getElementById("listFruit")
  while (ul.firstChild) {
    ul.removeChild(ul.firstChild)
  }
  frutas.map(f => { listFruit(f) })
  document.getElementById("newFruit").value = ""
}

frutas.map(f => { listFruit(f) })



//reconocimiento de voz

var recognition;
var recognizing = false;

//verificacion de existencia del objeto webkitSpeechRecognition
if (!('webkitSpeechRecognition' in window)) {
  alert("¡API no soportada!");
} else {

  recognition = new webkitSpeechRecognition();
  recognition.lang = "es-VE";
  recognition.continuous = true;
  recognition.interimResults = true;

  //Este evento se ejecuta cuando la función start() es invocada el navegador empieza a escuchar
  recognition.onstart = function() {
    recognizing = true;
    console.log("empezando a escuchar");
  }

  //este evento devuelve el resultado obtenido en texto plano.
  recognition.onresult = function(event) {
   for (var i = event.resultIndex; i < event.results.length; i++) {
    if(event.results[i].isFinal)
      document.getElementById("newFruit").value += event.results[i][0].transcript;
      }
    //texto
  }

  recognition.onerror = function(event) {
  }

  //Este evento se ejecuta cuando el usuario ha acabado de hablar
  recognition.onend = function() {
    recognizing = false;
    console.log("terminó de escuchar, llegó a su fin");
  }
}

function procesar() {
  if (recognizing == false) {
    recognition.start();
    recognizing = true;
  } else {
    recognition.stop();
    recognizing = false;
  }
}

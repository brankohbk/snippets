
const firebase = require("https://www.gstatic.com/firebasejs/7.12.0/firebase-app.js");
// Required for side-effects
require("firebase/firestore");

// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
  apiKey: "AIzaSyDULDYB6Z0jUE8ZBmxnlY_MrDNTWiNljps",
    authDomain: "mindhub-snippets.firebaseapp.com",
    databaseURL: "https://mindhub-snippets.firebaseio.com",
    projectId: "mindhub-snippets"
  });
  
var db = firebase.firestore();

var modulos =[{
  "nombre": ".css Grid",
  "imagen": "background-image: url('./img/caratulas/cssgrid.jpg');",
  "titulo": "CSS grid",
  "detalle": "'Dibujo' de un robot realizado con CSS Grid. Mediante JS y animaciones de CSS se le agregó interactividad.",
  "demoUrl": "https://rodrigr.github.io/robogrid/",
  "autor": "Rodrigo García Ribeiro",
  "repoUrl": "https://github.com/rodrigr/robogrid/",
  "tags": ["css", "js", "javascript"]
},
{
  "nombre": ".media queries",
  "imagen": "background-image: url('./img/caratulas/mediaqueries.png');",
  "titulo": "Media queries.",
  "detalle": "Introducción al desarrollo responsive. Los @media se utilizan en CSS para consultar cómo es el medio que utiliza el usuario para interactuar con nuestro sitio.",
  "demoUrl": "https://brankohbk.github.io/mediaqueries/",
  "autor": "Branko Haberkon",
  "repoUrl": "https://github.com/brankohbk/mediaqueries",
  "tags": ["css", "html", "media", "queries", "query"]
},
{
  "nombre": ".bootstrap",
  "imagen": "background-image: url('./img/caratulas/bootstrap.jpg');",
  "titulo": "Bootstrap.",
  "detalle": "Ejemplo sumamente sencillo para demostrar el uso de Bootstrap para dar estilos y comportamientos responsivos a nuestros proyectos mediante clases de CSS.",
  "demoUrl": "https://brankohbk.github.io/bootstrapexample/bootstrap.html",
  "autor": "Branko Haberkon",
  "repoUrl": "https://github.com/brankohbk/bootstrapexample",
  "tags": ["css", "html", "bootstrap"]
},
{
  "nombre": ".objetos",
  "imagen": "background-image: url('./img/caratulas/objetos.png');",
  "titulo": "Objetos en JS.",
  "detalle": "Instanciar objetos desde un constructor, e interactuar con ellos.",
  "demoUrl": "https://brankohbk.github.io/jsobjects/index.html",
  "autor": "Branko Haberkon",
  "repoUrl": "https://github.com/brankohbk/jsobjects",
  "tags": ["js", "javascript", "oop", "objetos"]
},
{
  "nombre": ".canvas",
  "imagen": "background-image: url('./img/caratulas/canvashtml5.png');",
  "titulo": "HTML5 Canvas.",
  "detalle": "Cómo utilizar el elemento HTML <canvas> para desarrollar un pequeño videojuego.",
  "demoUrl": "https://brankohbk.github.io/htmlCanvas/",
  "autor": "Branko Haberkon",
  "repoUrl": "https://github.com/brankohbk/htmlCanvas/",
  "tags": ["canvas", "html", "js", "javascript", "game", "juego"]
},
{
  "nombre": ".js DOM manipulation",
  "imagen": "background-image: url('./img/caratulas/jsdom.png');",
  "titulo": "Manipulación de DOM con JS",
  "detalle": "Grid demo for Battleship project of MindHub Bootcamp with no frameworks. Pure JS",
  "demoUrl": "https://rodrigr.github.io/vanilla-battleship-grid/grid.html",
  "autor": "Rodrigo García Ribeiro",
  "repoUrl": "https://github.com/rodrigr/",
  "tags": ["js", "javascript", "html", "dom"]
},
{
  "nombre": ".componentes de Vue.js",
  "imagen": "background-image: url('./img/caratulas/vuejs.png');",
  "titulo": "Vue.js: componentes",
  "detalle": "Uso de componentes de Vue.js para mejorar la escalabilidad te los proyectos.",
  "demoUrl": "https://rodrigr.github.io/vue-demo/",
  "autor": "Rodrigo García Ribeiro",
  "repoUrl": "https://github.com/rodrigr/vue-demo/",
  "tags": ["vue", "js", "javascript"]
},
{
  "nombre": ".firebase chat",
  "imagen": "background-image: url('./img/caratulas/firebase.jpg');",
  "titulo": "Firebase login & database",
  "detalle": "Ejemplo de implementación de login y uso de RealTime DataBase de Firebase.",
  "demoUrl": "https://my-spa-9d6f0.firebaseapp.com/",
  "autor": "Rodrigo García Ribeiro",
  "repoUrl": "https://github.com/rodrigr/",
  "tags": ["js", "javascript", "firebase", "realtime", "db", "rtdb", "database"]
},
{
  "nombre": ".svg render",
  "imagen": "background-image: url('./img/caratulas/svg_logo.jpg');",
  "titulo": "SVG Scalable Vector Graphics",
  "detalle": "Dibujo de polígonos en SVG mediante JavaScript.",
  "demoUrl": "https://rodrigr.github.io/svg/",
  "autor": "Rodrigo García Ribeiro",
  "repoUrl": "https://github.com/rodrigr/svg/",
  "tags": ["js", "javascript", "svg"]
}

]

modulos.forEach(function(obj) {
    db.collection("modulos").add({
        nombre: obj.nombre,
        imagen: obj.imagen,
        titulo: obj.titulo,
        detalle: obj.detalle,
        demoUrl: obj.demoUrl,
        autor: obj.autor,
        repoUrl: obj.repoUrl,
        tags: obj.tags
    }).then(function(docRef) {
        console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
        console.error("Error adding document: ", error);
    });
});
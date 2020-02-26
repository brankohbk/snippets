
// Fixes unnecessary scrolling in mobile
let vh, vw;
function updateSize() {
  vh = window.innerHeight * 0.01;
  vw = window.innerWidth * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

}
window.addEventListener("resize", updateSize)
updateSize();

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

const app = new Vue({
  el:"#app",
  data:{
    qod:"",
    modulos:[],
    search:''
  },
  methods:{},
  created(){

    async function fetchAll(){
      let resQuotes = await fetch("./json/quotes.json");
      let jsonQuotes = await resQuotes.json();

      let resModulos = await fetch("./json/modulos.json");
      let jsonModulos = await resModulos.json();
      
      return [jsonQuotes,jsonModulos]
    }

    fetchAll()
    .then(data => {
      const index =random(0, data[0].quotes.length-1);
      app.qod=data[0].quotes[index];
      app.modulos=data[1].modulos;

    })
  },
  computed:{
    filtered:function(){
 
      return this.modulos.filter(modulo => {
        return modulo.titulo.toLowerCase().match(this.search.toLowerCase())
        })


    }
  },
  components:{
    cards:{
      props:['array'],
      template:`
      <div id="playfield" class="col-12 d-flex">
      <transition-group name="fade" mode="out-in" :duration="250" class="col-12 d-flex justify-content-around flex-wrap py-2">
      <div v-for="modulo in array" v-bind:key="modulo" class="flip-card my-2">
      <div class="flip-card-inner d-flex">
      <div class="flip-card-front" :style="modulo.imagen">
              <h4>{{modulo.nombre}}</h4>
              </div>
              <div class="flip-card-back p-2 d-flex flex-column flex-grow-1">
              <h1>{{modulo.titulo}}</h1>
              <p class="">{{modulo.detalle}}</p>
              <p class="my-3">By <a class="" target="_blank" :href='modulo.autorProfile'>{{modulo.autor}}</a></p>
              <a :href='modulo.url' class="btn btn-purple" target="_blank" rel="noopener noreferrer">Ir al micrositio</a>


              </div>
              </div>
              </div>
              </transition>  
              </div>       
              `
    },
    quote:{
      props:["quote"],
      template:`
      <blockquote class="blockquote text-right mx-5">
        <p class="mb-0">{{quote.text}}</p>
        <div class="blockquote-footer">{{quote.author ? quote.author : "Anonimous"}}</div>
      </blockquote>
      `
    }
  }
})
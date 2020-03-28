//Hi!
console.log("%c Hello, fellow Dev! \n\n ( ͡° ͜ʖ ͡°)つ","color:orange;font-size:1.5em")
console.log("%cArmamos este sitio aplicando la gran mayoría de ejemplos catalogados acá.\nCada ejemplo tiene una Live Demo y el link al Repositorio de GitHub para poder analizar el código fuente.\nEsperamos que te sirva de guía! \n\n","color:black;background-color: orange;font-size:1.15em")


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
    allQuotes:[],
    modulos:[],
    tags:[],
    search:'',
    loaded:false,
  },
  methods:{},
  created(){

    // async function fetchAll(){
    //   let resQuotes = await fetch("./json/quotes.json");
    //   let jsonQuotes = await resQuotes.json();

    //   let resModulos = await fetch("./json/modulos.json");
    //   let jsonModulos = await resModulos.json();
      
    //   return [jsonQuotes,jsonModulos]
    // }

    async function fetchAll(){
      let result = {quotes:[],modulos:[]}
      await db.collection('quotes').get().then(snapshot =>{
        snapshot.docs.forEach(doc=> result.quotes.push(doc.data()))
      })     
      await db.collection('modulos').get().then(snapshot =>{
        snapshot.docs.forEach(doc=> result.modulos.push(doc.data()))
      })

      return result;
    } 

    fetchAll()
    .then(data => {
      console.log(data)
      const index =random(0, data.quotes.length-1);
      app.allQuotes=data.quotes;
      app.qod=data.quotes[index];
      app.modulos=data.modulos;
      data.modulos.forEach(modulo => {modulo.tags.forEach(tag =>{app.tags.includes(tag) ? null : app.tags.push(tag)})});
      app.tags.sort((a,b) => { if(a>b) return  1 ; if(a<b) return -1 ; return  0 } )
      // Forzar el spinner de carga.
      setTimeout( () =>{ app.loaded=true },750);
    })
  },
  computed:{
    filtered:function(){ 
      return this.modulos.filter(modulo => {
        return modulo.tags.some(tag => tag.toLowerCase().match(this.search.toLowerCase()))
        })
    }
  },
  components:{
    cards:{
      props:['modulos'],
      template:`
      <div id="playfield" class="col-12 d-flex">
      <transition-group name="fade" mode="out-in"  class="col-12 d-flex justify-content-around flex-wrap py-2">
      <div v-for="(modulo,index) in modulos" v-bind:key="modulo.nombre" class="flip-card m-2">
      <div class="flip-card-inner d-flex">
      <div class="flip-card-front" :style="modulo.imagen">
              <h4>{{modulo.nombre}}</h4>
              </div>
              <div class="flip-card-back p-2 d-flex flex-column justify-content-around flex-grow-1">
              <h1>{{modulo.titulo}}</h1>
              <p class="">{{modulo.detalle}}</p>
              <p class=""><a class="" target="_blank" :href='modulo.repoUrl'>by {{modulo.autor}} <img src="./img/source-code.png" alt="Source code" class="source-code-logo" /> </a></p>
              <a :href='modulo.demoUrl' class="btn btn-purple" target="_blank" rel="noopener noreferrer">Live Demo</a>


              </div>
              </div>
              </div>
              </transition-group>  
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
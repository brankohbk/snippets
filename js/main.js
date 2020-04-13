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
    modulos:[],
    tags:[],
    search:'',
    loaded:false,
  },
  methods:{    
    beforeEnter: function (el) {
    el.style.opacity = 0
    el.style.height = 0
  },
  enter: function (el, done) {
    var delay = el.dataset.index * 150
    setTimeout(function () {
      Velocity(
        el,
        { opacity: 1, height: '1.6em' },
        { complete: done }
      )
    }, delay)
  },
  leave: function (el, done) {
    var delay = el.dataset.index * 150
    setTimeout(function () {
      Velocity(
        el,
        { opacity: 0, height: 0 },
        { complete: done }
      )
    }, delay)
  }},
  created(){

    async function fetchQuotes(){
      let resQuotes = await fetch("./json/quotes.json");
      let jsonQuotes = await resQuotes.json();
      const index =random(0, jsonQuotes.quotes.length-1);
      app.qod=jsonQuotes.quotes[index];
      app.loaded=true;
    }

    fetchQuotes();

    db.collection('modulos').onSnapshot(snapshot =>{
      let changes = snapshot.docChanges();
      changes.forEach(change =>{
        if(change.type==='added'){app.modulos.push(change.doc.data())}
        if(change.type==='removed'){app.modulos.splice(app.modulos.indexOf(change.doc.data()),1)}});
      app.modulos.forEach(modulo => {modulo.tags.forEach(tag =>{app.tags.includes(tag) ? null : app.tags.push(tag)})});
      app.tags.sort((a,b) => { if(a>b) return  1 ; if(a<b) return -1 ; return  0 } );
    })

  },
  // mounted() {
    // Get your items and set all to hidden
    // if (this.modulos) {
    //     this.items = JSON.parse(localStorage.getItem("items"))
    //                  .map(item => item.isVisible = false);
    // }

    // Loop through and show the tasks
    // for(let i=1; i<=this.items.length; i++){
        // Where 300 is milliseconds to delay
    //     let delay = i * 300;

    //     setTimeout(function(){
    //         this.items[i].isVisible = true;
    //     }.bind(this), delay);
    // }
// },
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
      <transition-group mode="out-in" class="col-12 d-flex justify-content-around flex-wrap py-2" name="fade">
      <div v-for="(modulo,index) in modulos" v-bind:key="modulo.nombre" class="flip-card m-2">
      <div class="flip-card-inner d-flex">
      <div class="flip-card-front" :style="modulo.imagen">
              <h4>{{modulo.nombre}} </h4>
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
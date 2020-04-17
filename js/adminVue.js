

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
    modulos:[],
    loggedIn:false,
  },
  created(){    
    
      db.collection('modulos').onSnapshot(snapshot =>{
        let changes = snapshot.docChanges();
        changes.forEach(change =>{
          if(change.type==='added'){app.modulos.push(change.doc.data())}
          if(change.type==='removed'){
            const quitar= app.modulos.filter(modulo=> modulo.nombre==change.doc.data().nombre)
            app.modulos.splice(app.modulos.indexOf(quitar[0]),1)
          }
        });
      
    })
    
},

})
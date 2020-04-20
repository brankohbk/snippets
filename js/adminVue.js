

// Fixes unnecessary scrolling in mobile
let vh, vw;
function updateSize() {
  vh = window.innerHeight * 0.01;
  vw = window.innerWidth * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

}
window.addEventListener("resize", updateSize)
updateSize();


/**
 * Enable Bootstrap tooltips using Vue directive
 * @author Vitim.us
 * @see https://gist.github.com/victornpb/020d393f2f5b866437d13d49a4695b47
 */
Vue.directive('tooltip', {
  bind: function bsTooltipCreate(el, binding) {
    let trigger;
    if (binding.modifiers.focus || binding.modifiers.hover || binding.modifiers.click) {
      const t = [];
      if (binding.modifiers.focus) t.push('focus');
      if (binding.modifiers.hover) t.push('hover');
      if (binding.modifiers.click) t.push('click');
      trigger = t.join(' ');
    }
    $(el).tooltip({
      title: binding.value,
      placement: binding.arg,
      trigger: trigger,
      html: binding.modifiers.html
    });
  },
  update: function bsTooltipUpdate(el, binding) {
    const $el = $(el);
    $el.attr('title', binding.value).tooltip('fixTitle');

    const data = $el.data('bs.tooltip');
    if (binding.modifiers.live) { // update live without flickering (but it doesn't reposition)
      if (data.$tip) {
        if (data.options.html) data.$tip.find('.tooltip-inner').html(binding.value);
        else data.$tip.find('.tooltip-inner').text(binding.value);
      }
    } else {
      if (data.inState.hover || data.inState.focus || data.inState.click) $el.tooltip('show');
    }
  },
  unbind(el, binding) {
    $(el).tooltip('destroy');
  },
});



const app = new Vue({
  el:"#app",
  data:{
    modulos:[],
    loggedIn:false,
    tags:[],
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

// Fixes unnecessary scrolling in mobile
let vh, vw;
function updateSize() {
  vh = window.innerHeight * 0.01;
  vw = window.innerWidth * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

}
window.addEventListener("resize", updateSize)
updateSize();



function crearEnvase(nombre, volumen) {
  let exist = false
  objetos.forEach(objeto => objeto.nombre == nombre ? exist = true : null)
  if (!exist) {
    window[nombre] = new Envase(nombre, volumen)
    objetos.unshift(window[nombre])
  } else {
    alert(`Ya existe un envase con el nombre "${nombre}". Elija otro.`)
  }
}

function dibujarEnvases() {
  const container = document.getElementById("playfield")
  container.innerHTML = ""
  objetos.forEach(objeto => {
    const controles = document.createElement("DIV");
    controles.classList = "envase d-flex flex text-center justify-content-between p-1 m-1 my-md-4 border"
    controles.innerHTML = `
    <div class="col-9 d-flex flex-column text-center justify-content-between p-1 m-1 "> 
      <div class="row d-inline">        
      <button class="btn  btn-primary my-1 col-5" onclick='${objeto.nombre}.llenar()'>Llenar</button>
      <button class="btn  btn-danger my-1 col-5" onclick='${objeto.nombre}.vaciar()'>Vaciar</button>
      </div>
      <div class="row d-inline">
      <button class="btn btn-success my-1 col-5" onclick='${objeto.nombre}.cargar(10)'>Cargar 10ml</button>
      <button class="btn btn-warning my-1 col-5" onclick='${objeto.nombre}.descargar(10)'>Descargar 10ml</button>
      </div>
      <ul class="list-group">
          <li class="list-group-item bg-dark text-light">Nombre: <span id='${objeto.nombre}Nombre'></span>.</li class="list-group-item">
          <li class="list-group-item bg-dark text-light">Capacidad Total: <span id='${objeto.nombre}CapacidadTotal'></span>ml.</li>
          <li class="list-group-item bg-dark text-light">Capacidad Libre: <span id='${objeto.nombre}CapacidadLibre'></span>ml.</li>
          <li class="list-group-item bg-dark text-light">Volumen utilizado: <span id='${objeto.nombre}VolumenUtilizado'></span>ml.</li>
      </ul>
      <div class='row d-inline'>
       <div class="input-group input-group-sm col-12  my-1">
        <select class="custom-select " id="trasvasar${objeto.nombre}">
        <option selected disabled>Otro envase</option>
        </select>
      </div>
      <div class="input-group input-group-sm col-12">
        <input type="text" class="form-control" id="volumenTrasvaso${objeto.nombre}" placeholder="Mililitros">
        <div class="input-group-append">
          <span class="input-group-text">ml</span>
        </div>
      </div>
      <button onclick='${objeto.nombre}.trasvasar(trasvasar${objeto.nombre}.value,volumenTrasvaso${objeto.nombre}.value)' class="btn  btn-purple my-1">Trasvasar</button>
      </div>
      </div>      
      `;
    const envase = document.createElement("PROGRESS");
    envase.setAttribute("id", objeto.nombre)
    envase.setAttribute("value", objeto.capacidadTotal - objeto.capacidadLibre);
    envase.setAttribute("max", objeto.capacidadTotal);
    // envase.setAttribute("style", `width:${objeto.capacidadTotal /4}px;`) //VERIFICAR EN EL CSS
    envase.classList = "mx-auto"
    controles.insertBefore(envase, controles.childNodes[0]);
    container.appendChild(controles);
    cargarDropdown(objeto)
  })
}

function cargarDropdown(objeto) {
  const dropdown = document.querySelector(`#trasvasar${objeto.nombre}`)
  objetos.forEach(e => {
    if (e.nombre != objeto.nombre) {
      const option = document.createElement("OPTION");
      option.innerText=e.nombre
      option.setAttribute("value", e.nombre)
      dropdown.appendChild(option)       
    }
  }
  )
}

function actualizarEnvases() {
  const envases = document.querySelectorAll("progress")
  envases.forEach(envase => {
    objetos.forEach(objeto => {
      const nombre = document.querySelector(`#${objeto.nombre}Nombre`)
      const capTot = document.querySelector(`#${objeto.nombre}CapacidadTotal`)
      const capLib = document.querySelector(`#${objeto.nombre}CapacidadLibre`)
      const volUti = document.querySelector(`#${objeto.nombre}VolumenUtilizado`)

      if (objeto.nombre == envase.id) {
        envase.value = objeto.capacidadTotal - objeto.capacidadLibre
        nombre.innerText = objeto.nombre
        capTot.innerText = objeto.capacidadTotal
        capLib.innerText = objeto.capacidadLibre
        volUti.innerText = objeto.capacidadTotal - objeto.capacidadLibre
      }
    }
    )
  }

  )
}


document.querySelectorAll("button")
  .forEach(button =>
    button.addEventListener("click", function (event) {
      event.preventDefault();
      dibujarEnvases();
    }
    )
  )

dibujarEnvases()
setInterval(actualizarEnvases, 100)
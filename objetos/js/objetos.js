objetos = []
// Instanciamos un objeto "vaso".
vaso = {
    // Propiedades.
    // Serían las cualidades del objeto en la vida real
    nombre: "vaso",
    capacidadTotal: undefined,
    capacidadLibre: undefined,

    // Métodos.
    // ¿Qué función puede cumplir el vaso?
    // Son verbos, acciones que puede realizar este objeto.
    setCapacidadTotal: function (ml) {
        this.capacidadTotal = ml
        this.capacidadLibre = ml
    },
    vaciar: function () {
        this.capacidadLibre = this.capacidadTotal;
    },
    llenar: function () {
        this.capacidadLibre = 0
    },
    cargar: function (cantidad) {
        if (this.capacidadLibre >= cantidad) {
            this.capacidadLibre = this.capacidadLibre - cantidad
        } else {
            return `No hay capacidad libre suficiente para contener esa cantidad.\nSi agregamos ${cantidad} ml teniendo ${this.capacidadLibre} ml libres van a sobrar ${(this.capacidadTotal - cantidad) * -1} ml`
        }
    },
    descargar: function (cantidad) {
        cantidad < this.capacidadTotal ?
            this.capacidadLibre = this.capacidadLibre + cantidad
            : this.capacidadLibre = this.capacidadTotal
    },
    getCapacidadLibre: function () {
        return this.capacidadLibre + " ml"
    },
    getCapacidadTotal: function () {
        return this.capacidadTotal + " ml"
    },
}

vaso.setCapacidadTotal(250)

// Otra forma de instanciar objetos: usar un constructor.
// Nombramos una función con un sustantivo más genérico y 
// declaramos los argumentos que pasarán a ser los valores de las propiedades inicializadas.

function Envase(nombre, capacidadTotal) {
    // Propiedades.
    this.nombre = nombre
    this.capacidadTotal = capacidadTotal;
    this.capacidadLibre = capacidadTotal;
    // Métodos.
    this.vaciar = function () {
        this.capacidadLibre = this.capacidadTotal;
    }
    this.llenar = function () {
        this.capacidadLibre = 0
    }
    this.cargar = function (cantidad) {
        if (this.capacidadLibre >= cantidad) {

            this.capacidadLibre = this.capacidadLibre - cantidad
        } else {
            return `No hay capacidad libre suficiente para contener esa cantidad.\nSi agregamos ${cantidad} ml teniendo ${this.capacidadLibre} ml libres van a sobrar ${(this.capacidadTotal - cantidad) * -1} ml`
        }
    }
    this.descargar = function (cantidad) {
        (this.capacidadLibre + cantidad <= this.capacidadTotal)?
            this.capacidadLibre = this.capacidadLibre + cantidad
            : this.capacidadLibre = this.capacidadTotal
    }
    this.getCapacidadLibre = function () {
        return this.capacidadLibre + " ml"
    }
    this.getCapacidadTotal = function () {
        return this.capacidadTotal + " ml"
    }
    // Creamos un método para interactuar con otros objetos.
    this.trasvasar = function (otroEnvase, cantidad) {
        if (this.capacidadTotal - this.capacidadLibre < cantidad) { return "No hay suficiente líquido para trasvasar" }
        else if (otroEnvase.capacidadLibre <= cantidad) { return `No hay capacidad libre suficiente en el otro envase` }
        else {
            this.descargar(cantidad);
            otroEnvase.cargar(cantidad);
        }
    }
}

// "botella", "taza" y "pinta" son objetos instanciados a partir del constructor "envase".
// En este caso puntual, al constructor le pasamos como parámetro la capacidad total del objeto.
botella = new Envase("botella", 1000)
taza = new Envase("taza", 320)
pinta = new Envase("pinta", 470)

objetos.push(botella, taza, pinta, vaso)

function dibujarEnvases() {
    const container = document.getElementById("playfield")
    objetos.forEach(objeto => {
        const controles = document.createElement("DIV");
        controles.classList = "d-flex flex-column text-center justify-content-between p-1 m-1 border"
        controles.innerHTML = `
        <button class="btn btn-sm btn-primary my-1" onclick='${objeto.nombre}.llenar()'>Llenar</button>
        <button class="btn btn-sm btn-danger my-1" onclick='${objeto.nombre}.vaciar()'>Vaciar</button>
        <button class="btn btn-sm btn-success my-1" onclick='${objeto.nombre}.cargar(10)'>Cargar 10ml</button>
        <button class="btn btn-sm btn-warning my-1" onclick='${objeto.nombre}.descargar(10)'>Volcar 10ml</button>
        <ul class="list-group">
            <li class="list-group-item bg-dark text-light">Nombre: <span id='${objeto.nombre}Nombre'></span>.</li class="list-group-item">
            <li class="list-group-item bg-dark text-light">Capacidad Total: <span id='${objeto.nombre}CapacidadTotal'></span>ml.</li>
            <li class="list-group-item bg-dark text-light">Capacidad Disponible: <span id='${objeto.nombre}CapacidadLibre'></span>ml.</li>
            <li class="list-group-item bg-dark text-light">Volumen utilizado: <span id='${objeto.nombre}VolumenUtilizado'></span>ml.</li>
        </ul>
        

        `;

        const envase = document.createElement("PROGRESS");
        envase.setAttribute("id", objeto.nombre)
        envase.setAttribute("value", objeto.capacidadTotal - objeto.capacidadLibre);
        envase.setAttribute("max", objeto.capacidadTotal);
        // envase.setAttribute("style", `width:${objeto.capacidadTotal /4}px;`) VERIFICAR EN EL CSS
        envase.classList = "mx-auto"

        controles.insertBefore(envase, controles.childNodes[0]);
        container.appendChild(controles);
    })
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
                nombre.innerText=objeto.nombre
                capTot.innerText=objeto.capacidadTotal
                capLib.innerText=objeto.capacidadLibre
                volUti.innerText=objeto.capacidadTotal - objeto.capacidadLibre
            }
        }
        )
    }

    )
}



dibujarEnvases()
setInterval(actualizarEnvases, 100)
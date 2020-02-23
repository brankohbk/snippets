function Envase(nombre,capacidadTotal){
    // PROPIEDADES
    this.nombre=nombre
    this.capacidadTotal=capacidadTotal;
    this.capacidadLibre=capacidadTotal;

    // METODOS
    this.llenar = function(){
        this.capacidadLibre=0;
    }
    this.vaciar=function(){
        this.capacidadLibre=this.capacidadTotal
    }
    this.cargar=function(cantidad){
        if(this.capacidadLibre-cantidad >= 0){
            this.capacidadLibre-=cantidad
        }else{
            console.log("No se puede cargar tanto")
        }
    }
    this.descargar=function(cantidad){
        if(this.capacidadLibre + cantidad <= this.capacidadTotal){
            this.capacidadLibre+=cantidad
        }else{
            console.log("No se puede cargar tanto")
        }
    }
    this.trasvasar = function(otroEnvase, cantidad){
        if(otroEnvase.capacidadLibre >= cantidad){
            if(this.capacidadTotal - this.capacidadLibre >= cantidad){
                this.descargar(cantidad)
                otroEnvase.cargar(cantidad)
            }
        }
    }
}

vaso = new Envase("vaso",250)
botella = new Envase("botella",500)
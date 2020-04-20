// TEST BORRAR EN PRODUCCION
// $('#altaModulo').modal('show');



//References
const loginForm = document.querySelector("#login-form");
const logout = document.querySelector("#logout");
const createForm = document.querySelector("#create-form");
const subirImagen = document.querySelector("#subirImagen");
const aceptar = document.querySelector("#aceptar")
const progresoSubida = document.querySelector("#subidaProgreso .progress-bar")
const vistaPreviaSubida = document.querySelector("#vistaPreviaSubida")
var caratulaURL;

const inputs= createForm.querySelectorAll("input");
inputs.forEach(input =>{input.addEventListener("input" ,()=>chequear())})


function chequear() {
  inputs.forEach(dato =>{ 
    dato.value==="" ? aceptar.disabled=true : aceptar.disabled=false;
  })
}

subirImagen.addEventListener("change", subirAFirebase, false);
function subirAFirebase() {
  resetearSubida()
  const archivo = subirImagen.files[0];
  const uploadTask = storageRef.child("caratulas/" + archivo.name).put(archivo);

  uploadTask.on("state_changed",
    function (snapshot) {
      //Mostrar progeso de subida
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      progresoSubida.style.width= `${progress}%`
      progresoSubida.innerHTML= `${progress}%`


    },
    function error(err) {
      //Atrapar errores
    createForm.querySelector(".error").innerHTML=`
    <p>Ocurrió un error al subir la imagen.</p>
    <p>Detalle: ${err.message}</p>`

    },
    function () {
      //Finalizada la subida, ejecutar: 
      //-Guarda la URL de la imagen
      uploadTask.snapshot.ref.getDownloadURL()
        .then((downloadURL) => {
          caratulaURL = downloadURL;
        });
      //-Oculta la barra de progreso
      setTimeout(() => {progresoSubida.parentElement.parentElement.style.opacity="0"}, 1050);

      setTimeout(()=>{
        progresoSubida.parentElement.parentElement.style.display="none"
        //-Muestra vista previa de la imagen
        vistaPreviaSubida.firstChild.src=caratulaURL;        
        vistaPreviaSubida.style.display="block"; 
      },2050)
      setTimeout(() => {vistaPreviaSubida.style.opacity="1"}, 2055);
    }
  );
}

function resetearSubida(){
  progresoSubida.parentElement.parentElement.style.opacity="1"
  progresoSubida.parentElement.parentElement.style.display="block"
  vistaPreviaSubida.style.display="none"; 
  vistaPreviaSubida.style.opacity="0" 
  createForm.querySelector(".error").innerHTML=''

}



// Listen for auth status changes
auth.onAuthStateChanged(user => {
  if (user) {
    setupUI(user)
  } else {
    setupUI();
  }
})

//Render if logged in.
const setupUI = (user) => {
  if (user) {
    app.loggedIn = true;
  } else {
    app.loggedIn = false;

  }
}

//Login
loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  loginForm.querySelector(".error").innerHTML = "";
  const loading = loginForm.querySelector(".loading");
  loading.innerHTML = "Iniciando sesión, espere.";

  //get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  auth.signInWithEmailAndPassword(email, password)
    .then((cred) => {
      //reset form
      loading.setAttribute("style", "display:none");
      loginForm.reset();
    })
    .catch(err => {
      loading.innerHTML = "";
      loginForm.querySelector(".error").innerHTML = err.message;
    })
})

//Log out.
logout.addEventListener("click", (event) => {
  event.preventDefault();
  auth.signOut()
})



// Subir nuevo módulo
createForm.addEventListener("submit", (event) => {
  event.preventDefault();
  createForm.querySelector(".error").innerHTML = "";
  const loading = createForm.querySelector(".loading");
  loading.setAttribute("style", "display:block");

  const backgroundURL = `background-image: url('${caratulaURL}');`

  db.collection("modulos").doc().set({
    titulo: createForm["titulo"].value,
    nombre: createForm["nombre"].value,
    autor: createForm["autor"].value,
    detalle: createForm["detalle"].value,
    imagen: backgroundURL,
    imagenURL:caratulaURL,
    imagenTooltip:`<img src='${caratulaURL}' />`,
    demoUrl: createForm["demoUrl"].value,
    repoUrl: createForm["repoUrl"].value,
    tags: Array.from(createForm["tags"].value.split(",")),
  })
    .then(() => {
      $('#altaModulo').modal('toggle');
      aceptar.disabled = true;
      createForm.reset();
      resetearSubida();
    })
    .catch(err => {
      loading.setAttribute("style", "display:none");
      aceptar.disabled = true;
      createForm.reset();
      resetearSubida();
      createForm.querySelector(".error").innerHTML = err.message;
    })




})





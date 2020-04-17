//References
const loginForm = document.querySelector("#login-form");
const logout = document.querySelector("#logout");
const createForm = document.querySelector("#create-form");


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
      app.loggedIn=true;
    } else {
      app.loggedIn=false;

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



    // Create new guide
    createForm.addEventListener("submit", (event) => {
      event.preventDefault();
      createForm.querySelector(".error").innerHTML = "";
      const loading = createForm.querySelector(".loading");


      db.collection("modulos").doc().set({
          titulo: createForm["titulo"].value,
          nombre: createForm["nombre"].value,
          autor: createForm["autor"].value,
          detalle: createForm["detalle"].value,
          imagen: createForm["imagen"].value,
          demoUrl: createForm["demoUrl"].value,
          repoUrl: createForm["repoUrl"].value,
          tags: Array.from(createForm["tags"].value.split(",")),
        })
        .then(() => {
          $('#altaModulo').modal('toggle');
          createForm.reset();
        })
        .catch(err => {
          console.log(err)
          loading.setAttribute("style", "display:none");
          createForm.querySelector(".error").innerHTML = err.message;
        })
    })
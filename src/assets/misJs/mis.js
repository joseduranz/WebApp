const { Container } = ("@angular/compiler/src/i18n/i18n_ast");
const { snap } = ("gsap/all");

//*****************************************************************************
function botonHome(){
    let btn_scroll=document.getElementById('subirHome');
    btn_scroll.addEventListener('click', ()=>{
        window.scrollTo(0,0)
    });
    window.onscroll = () =>{
        if(window.scrollY < 300){
            subirHome.classList.remove("subirHomeActivo");
        }else{
            subirHome.classList.add("subirHomeActivo");
        }
    }
}
//==============APARECER EL MENU EN MODO CELULAR START===============================
function menudesplegable(){
    document.querySelector("#menu-btn").classList.toggle("fa-times");
    document.querySelector(".navbar").classList.toggle("active1");
    document.querySelector("#menu-btn2").classList.toggle("active2");
  
}
//==============APARECER EL MENU EN MODO CELULAR END===============================
//*****************************************************************************
/*=========================pantalla completa, cambiar el scroll objeto START======================*/
 $(window).scroll(function () {
        var scroll = $(window).scrollTop(),
            dh = $(document).height(),
            wh = $(window).height();
        scrollPercent = (scroll / (dh - wh)) * 100;
        $('#barra-progreso').css('height', scrollPercent + '%');
})
/*=========================pantalla completa, cambiar el scroll objeto END======================*/
 //*****************************************************************************
/*=========================CONF DE CARRUSEL SECION 0 START====================*/
$(document).ready(function(){
        $('.carousel__lista').slick({
            slidesToShow:1,
            slidesToScroll:1,
            autoplay:true,
            autoplaySpeed:3000,
            focusOnSelect:true,
            arrows:false,
            dots:false,
            pauseOnHover:false,
            responsive: [{
                breakpoint: 768,
                settings: {
                    slidesToShow: 1
                    }
                },
                {
                breakpoint: 520,
                settings: {
                    slidesToShow: 1
                    }
                },
            ]
        });
})
/*=========================CONF DE CARRUSEL SECION 0 END======================*/ 
//*****************************************************************************
/*=========================CREACION DEL METODO POST START======================*/ 
function RegistrarPersona(){
        let nombres = document.querySelector('#txtNombres').value;
        let apellidos = document.querySelector('#txtApellidos').value;
        let rol = document.querySelector('#txtRol').value;
        let direccion = document.querySelector('#txtDireccion').value;
        let correo = document.querySelector('#txtCorreo').value;
        let celular = document.querySelector('#txtCelular').value;
    
        let url = `http://localhost:4200/administracion/registrar`;
    
        let datos = {
          nombres:nombres,
          apellidos:apellidos,
          rol:rol,
          direccion:direccion,
          correoElectronico:correo,
          celular:celular
        }
    
        //capturar por el metodo fetch la informacion y enviarla a la base de datos
        fetch (url, {
          method:'POST',
          body: JSON.stringify(datos),
          headers:{'Content-Type':'application/json'}
        }).then(res =>res.json()) //la respuesta que me envia desde la base de datos
        .then(mensaje =>{
          console.log(mensaje) //mostrar en la consola el mensaje
        })
}
/*=========================CREACION DEL METODO POST END======================*/ 
    //*****************************************************************************
function validacion2(){        
    alert("funcionando 2")
}

function validacion(){
        const formulario = document.getElementById('formulario');
        const inputs = document.querySelectorAll('#formulario input');
    
        const expresiones = {
            usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
            nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
            password: /^.{4,12}$/, // 4 a 12 digitos.
            correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
            telefono: /^\d{7,14}$/ // 7 a 14 numeros.
        }
    
        const campos = {
            usuario: false,
            nombre: false,
            password: false,
            correo: false,
            telefono: false
        }
    
        const validarFormulario = (e) => {
            switch (e.target.name) {
                case "usuario":
                    validarCampo(expresiones.usuario, e.target, 'usuario');
                break;
                case "nombre":
                    validarCampo(expresiones.nombre, e.target, 'nombre');
                break;
                case "password":
                    validarCampo(expresiones.password, e.target, 'password');
                    validarPassword2();
                break;
                case "password2":
                    validarPassword2();
                break;
                case "correo":
                    validarCampo(expresiones.correo, e.target, 'correo');
                break;
                case "telefono":
                    validarCampo(expresiones.telefono, e.target, 'telefono');
                break;
            }
        }
    
        const validarCampo = (expresion, input, campo) => {
            if(expresion.test(input.value)){
                document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
                document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
                document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
                document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
                document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
                campos[campo] = true;
            } else {
                document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
                document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
                document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
                document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
                document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
                campos[campo] = false;
            }
        }
    
        const validarPassword2 = () => {
            const inputPassword1 = document.getElementById('password');
            const inputPassword2 = document.getElementById('password2');
    
            if(inputPassword1.value !== inputPassword2.value){
                document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
                document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
                document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
                document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
                document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
                campos['password'] = false;
            } else {
                document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
                document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
                document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
                document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
                document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
                campos['password'] = true;
            }
        }
    
        inputs.forEach((input) => {
            input.addEventListener('keyup', validarFormulario);
            input.addEventListener('blur', validarFormulario);
        });
    
        formulario.addEventListener('submit', (e) => {
            e.preventDefault();
    
            const terminos = document.getElementById('terminos');
            if(campos.usuario && campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked ){
                formulario.reset();
    
                document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
                setTimeout(() => {
                    document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
                }, 5000);
    
                document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
                    icono.classList.remove('formulario__grupo-correcto');
    
                    document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
                });
            } else {
                document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
                setTimeout(() => {
                    document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
                }, 5000);
            }
        });
    }

function gsapJava() {
    gsap.to(".imgPiso", {
        scrollTrigger: {
            end: "center top",
            scrub: 0
        },
        scaleY: -1.6,
    });
    /*------------*/
    gsap.to(".carousel__elemento", {
        scrollTrigger: {
            end: "center top",
            scrub: 0
        },
        translateY: 710,
        scaleY:.8

    });
    gsap.to(".sliderLogo", {
        scrollTrigger: {
            end: "center top",
            scrub: 0
        },
        translateY: 750
    });
    gsap.to(".cotenedor-icono i", {
        scrollTrigger: {
            end: "center top",
            scrub: 0
        },
        translateY: 800
    });
    /*------------*/
    gsap.to(".lamp1", {
        scrollTrigger: {
            end: "center top",
            scrub: 0
        },
        translateY: 1450,
    });
    /*------------*/
    gsap.to(".lamp2", {
        scrollTrigger: {
            end: "center top",
            scrub: 0
        },
        translateY: 1430,
    });
    /*------------*/
    gsap.to(".lamp3", {
        scrollTrigger: {
            end: "center top",
            scrub: 0
        },
        translateY: 1400,
    });
    /*------------*/
    gsap.to(".lamp4", {
        scrollTrigger: {
            end: "center top",
            scrub: 0
        },
        translateY: 1370,
    });
    /*------------*/
    gsap.to(".lamp5", {
        scrollTrigger: {
            end: "center top",
            scrub: 0
        },
        translateY: 1340,
    });
    /*------------*/
    gsap.to(".lamp6", {
        scrollTrigger: {
            end: "center top",
            scrub: 0
        },
        translateY: 1310,
    });
    /*------------*/
    gsap.to(".lamp7", {
        scrollTrigger: {
            end: "center top",
            scrub: 0
        },
        translateY: 1280,
    });
    /*------------*/
    gsap.to(".lamp8", {
        scrollTrigger: {
            end: "center top",
            scrub: 0
        },
        translateY: 1200,
    });
    
    /*gsap.to(".jarallax-img", {
        scrollTrigger: {
            scrub: 0
        },
        translateY: 1000,
    });

    

    //luinea de tiempo
    
   let tl = gsap.timeline({
        scrollTrigger:{
            trigger:"p",
            pin: true,
            start:"top top",
            end: "+=0",
            scrub: 5,
            snap:{
                snapTo:"labels",
                duration:{min:0.2, max:3},
                //delay:0.2,
                ease:"power.inOut"
            }
        }
    });    
    tl.addLabel("start").from(".contenedor__garantia p", {translateY: -50, autoAlpha: 0});
   

    gsap.to(".s2-img2 img", {/*carro prueba de manejo*/
      /*  scrollTrigger: {
            start: "top top",
            scrub: 3
        },
        translateX: -200,
    });*/
    

    gsap.to(".s3-img2-animacion", {/*llanta y sombra rodar y mover */
        scrollTrigger: {
            start: "center bottom",
            end: "bottom top",
            scrub: 3
        },
        rotate: 260,
    });
    gsap.to(".s3-img2 img", {/*llanta y sombra rodar y mover */
        scrollTrigger: {
            start: "center bottom",
            end: "bottom top",
            scrub: 3
        },
        translateX: 500
    });


 
}
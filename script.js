class OnlineShop {
    constructor() {
        this.tshirts = ['alemania', 'argentina', 'brasil', 'españa', 'francia'];
        this.username = $("#username");
        this.password = $("#password");
        this.dni = $("#dni");
        this.email = $("#email");
        this.iban = $("#IBAN");
        this.phone = $("#phone");


        this.loginError = $("#login-error");

        // check if user is logged in
        this.loggedIn = false;

        $("#btn-login").on("click", (event) => {
            event.preventDefault();
            this.checkUser(this.username.val(), this.password.val());
        });

        $("#btn-register").on("click", (event) => {
            event.preventDefault();
            this.username = null;
            this.password = null;
            this.registerUser(this.username.val(), this.password.val(), this.dni.val(), this.email.val(), this.iban.val(), this.phone.val())
            
        });

        $('.addToCart').on('click', (event) => {
            event.preventDefault();
            this.addItemsToCart();
        });

        $('.carousel-item').on('click', (event) => {
            event.preventDefault();
            this.showCarouselItem();
        });

    }
    


    welcomeMsg() {
        if(this.loggedIn) {
            $('#welcome-msg').html('<h1>Welcome back, ' + this.username + '!</h1>'
                + '<h3>Its a pleasure to have you as a client</h3>'
            );
        } else{
            $('#welcome-msg').html('Welcome to our online shop!'
                + '<h3>Sign in to be able to buy</h3>'
            );
        }
    }

    // login and register functions ///////
    checkUser(username, password) {



        console.log("Check user ejecutado con:", username, password); // Verifica que los valores llegan correctamente
        if (username === "" || password === "") {
            this.loginError.html("<p style='color:red;'>Login data not valid</p>");
            return;
        }

        $.ajax({
            url: 'http://www.lzwears.com/getUser.php',
            type: 'GET',
            dataType: 'text',  // Cambiado a 'text'
            data: {
                username: username,
                password: password
            },
            success: (response) => {
                console.log("Respuesta del servidor:", response);
                if (response.trim() === 'LOGGED IN') {
                    this.loggedIn = true;
                    sessionStorage.setItem('username', username);
                    this.username = username;
                    window.location.href = "/index.html";
                } else {
                    this.loginError.html("<p>Usuario o contraseña incorrectos</p>");
                }
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.error("Error en AJAX:", textStatus, errorThrown);
                this.loginError.html("<p>Error al conectar con el servidor</p>");
            }
        });
        
    }

    registerUser(username, password, dni, email, iban, phone) {

        $.ajax({
            url: 'http://www.lzwears.com/createUser.php',
            type: 'GET',
            dataType: 'text',
            data: {
                username: username,
                password: password,
                dni: dni,
                email: email,
                iban: iban,
                phone: phone
            },
            success: (response) => {
                console.log("Respuesta del servidor:", response);
                if (response.trim() === 'REGISTERED!') {
                    this.loggedIn = true;
                    sessionStorage.setItem('username', username);
                    this.username = username;
                    window.location.href = "index.html";
                }
            },
            error: (jqXHR, textStatus, errorThrown) => {
                console.error("Error en AJAX:", textStatus, errorThrown);
            }
        });
    }
    //////////////////////////////////////

    
    addItemsToCart() {
        alert('Item added to cart');
    }

    showCarouselItem(){
        
    }
}


$(document).ready(() => {
    const myshop = new OnlineShop();
    const loggedInUser = sessionStorage.getItem("username");  // Recuperamos el nombre de usuario

    if (loggedInUser) {
        myshop.loggedIn = true;
        myshop.username = loggedInUser;
        myshop.welcomeMsg();  // Muestra el mensaje de bienvenida con el nombre de usuario
    } else {
        myshop.welcomeMsg();  // Muestra el mensaje de bienvenida genérico
    }

    const app = Vue.createApp({
        //root component including data, methods
        data() {
          return {

            langs: {
                esp: {
                    home: 'Inicio',
                    products: 'Productos',
                    about: 'Sobre Nosotros',
                    language: 'Idioma'
                },
                eng: {
                    home: 'Home',
                    products: 'Products',
                    about: 'About us',
                    
                }
            },
            activeLang: 'Español',
            see :true}
         },
        methods: {
           toggleShow(e) {
            e.preventDefault()
            this.see =  !this.see;
          }, 
          changelanguage(e) {
            e.preventDefault()
            this.activeLang =  'English';
          }
          }
        })
      
        app.mount('#app')

});
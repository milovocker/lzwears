class OnlineShop {
    constructor() {
        this.tshirts = ['alemania', 'argentina', 'brasil', 'españa', 'francia'];
        this.sweaters = ['Boston Celtics', 'Jordan Logo', 'Jordan Negra', 'Nike Verde y Negra', 'Project Paris Crema', 'Puma Violeta'];
        this.pants = ['jeans', 'shorts', 'trousers', 'leggings', 'joggers'];
        this.shoes = ['Nike Air Max 1', 'New Balance Grey', 'Adidas Samba', 'Nike Vapormax'];
        this.accessories = ['hats', 'sunglasses', 'watches', 'belts', 'bags'];


        this.loginError = $("#login-error");

        // check if user is logged in
        this.loggedIn = false;

        $("#btn-login").on("click", (event) => {
            event.preventDefault();
            this.username = $("#username");
            this.password = $("#password");
            this.checkUser(this.username.val(), this.password.val());
        });

        $("#btn-register").on("click", (event) => {
            event.preventDefault();
            this.username = $("#username");
            this.password = $("#password");
            this.dni = $("#dni");
            this.email = $("#email");
            this.iban = $("#IBAN");
            this.phoneNumber = $("#phoneNumber");
            this.registerUser(this.username.val(), this.password.val(), this.dni.val(), this.email.val(), this.iban.val(), this.phoneNumber.val())
        });

        $('.addToCart').on('click', (event) => {
            event.preventDefault();
            this.addItemsToCart();
        });

        $('.carousel-item').on('click', (event) => {
            event.preventDefault();
            this.showCarouselItem();
        });

        $(document).on('click', '.dropdownTags', (event) => {
            event.preventDefault();
            const productType = event.target.id;
            this.showProducts(productType);
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

    registerUser(username, password, dni, email, iban, phoneNumber) {
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
                phoneNumber: phoneNumber
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

    addProductToCart() {
        alert('Item added to cart');
    }

    showProducts(productType) {
        // Obtener la lista de productos según la categoría seleccionada
        const products = this[productType];
    
        // Crear el HTML para cada producto
        let productHTML = '<div class="product-container d-flex justify-content-center" style="flex-wrap: wrap; max-width: 700px; border: 1px solid #ccc; padding: 10px;">';
        products.forEach(product => {
            productHTML += `
            <div class="product-box">
                <img src="img/${productType}/${product}.png" alt="${product}" class="product-image" style="width: 200px;">
                <h3 class="product-name">${product.charAt(0).toUpperCase() + product.slice(1)}</h3>
                <p class="product-price">$19.99</p>
                <button class="addToCart btn btn-primary" data-product="${product}"><i class="bi bi-cart"></i></button>
            </div>
        `;
        });
        productHTML += '</div>';
    
        // Mostrar el contenido en el contenedor de productos
        $('#products').html(productHTML);
    
        // Vincular el evento de añadir al carrito
        $('.addToCart').on('click', (event) => {
            event.preventDefault();
            const product = $(event.target).data('product');
            this.addProductToCart(product);
        });
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

    ///// VUE /////
    const app = Vue.createApp({
        data() {
            return {
                langs: {
                    esp: {
                        home: 'Inicio',
                        products: 'Productos',
                        about: 'Sobre Nosotros',
                        language: 'Idioma',
                        tshirts: 'Camisetas de fútbol',

                        sweaters: 'Sudaderas',
                        pants: 'Pantalones',
                        shoes: 'Zapatos',
                        accessories: 'Accesorios'
                    },
                    eng: {
                        home: 'Home',
                        products: 'Products',
                        about: 'About us',
                        language: 'Language',
                        tshirts: 'Football T-shirts',
                        sweaters: 'Sweaters',
                        pants: 'Pants',
                        shoes: 'Shoes',
                        accessories: 'Accessories'
                    }
                },
                activeLang: 'esp', // Idioma predeterminado
                see: false
            };
        },
        computed: {
            translated() {
                return this.langs[this.activeLang]; // Devuelve los textos traducidos dinámicamente
            }
        },
        methods: {
            toggleShow(e) {
                e.preventDefault();
                this.see = !this.see;
            },
            changeLanguage(e, lang) {
                e.preventDefault();
                this.activeLang = lang; // Cambia el idioma
            }
        }
    });

    app.mount('#app');
});
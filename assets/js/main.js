document.addEventListener('DOMContentLoaded', () => {
    // Verificación de autenticación
    const loginForm = document.getElementById('loginForm');
    
    if (!loginForm) { // Si no estamos en la página de login
        const isAuthenticated = sessionStorage.getItem('isAuthenticated');
        
        if (!isAuthenticated) {
            window.location.href = 'login.html';
        }
    } else { // Si estamos en la página de login
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const validUsername = 'admin';
            const validPassword = '1234';

            if (username === validUsername && password === validPassword) {
                sessionStorage.setItem('isAuthenticated', true);
                window.location.href = 'index.html';
            } else {
                document.getElementById('loginError').style.display = 'block';
            }
        });
    }

    // Manejo del formulario de solicitud
    const form = document.getElementById('solicitudForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const data = {
                cliente: document.getElementById('cliente').value,
                contacto: document.getElementById('contacto').value,
                auto: document.getElementById('auto').value
            };

            console.log("Datos de la solicitud:", data);
            form.reset();
        });
    }

    // Autos en stock
    const stockList = document.getElementById('stock-list');
    if (stockList) {
        const autos = [
            { marca: 'Toyota', modelo: 'Corolla', año: 2023 },
            { marca: 'Honda', modelo: 'Civic', año: 2022 },
            { marca: 'Ford', modelo: 'Mustang', año: 2024 }
        ];

        stockList.innerHTML = autos.map(auto => 
            `<p>${auto.marca} ${auto.modelo} (${auto.año})</p>`
        ).join('');
    }

    // Clientes
    const clientsList = document.getElementById('clients-list');
    if (clientsList) {
        const clientes = [
            { nombre: 'Juan Pérez', contacto: 'juan@example.com' },
            { nombre: 'Ana López', contacto: 'ana@example.com' },
            { nombre: 'Carlos García', contacto: 'carlos@example.com' }
        ];

        clientsList.innerHTML = clientes.map(cliente => 
            `<p>${cliente.nombre} - ${cliente.contacto}</p>`
        ).join('');
    }
});

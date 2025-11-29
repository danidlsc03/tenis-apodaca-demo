document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("grid-productos");
    const modal = document.getElementById("modal-producto");
    const closeBtn = document.querySelector(".close-btn");

    // Configuración del Cliente
    const TELEFONO_TIENDA = "8128982209"; // ¡PON EL NÚMERO REAL AQUÍ!

    // 1. CARGAR PRODUCTOS DESDE JSON
    fetch("data/productos.json")
        .then(response => response.json())
        .then(data => {
            data.forEach(producto => {
                // Crear tarjeta HTML
                const card = document.createElement("div");
                card.classList.add("card");
                card.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                    <div class="card-info">
                        <h3>${producto.nombre}</h3>
                        <p class="precio">$${producto.precio}</p>
                        <button class="btn-ver">VER DETALLES</button>
                    </div>
                `;

                // Evento Click para abrir Modal
                card.addEventListener("click", () => abrirModal(producto));
                contenedor.appendChild(card);
            });
        })
        .catch(error => console.error("Error cargando productos:", error));

    // 2. FUNCIÓN ABRIR MODAL
    function abrirModal(producto) {
        // Llenar datos en el HTML del modal
        document.getElementById("modal-img").src = producto.imagen;
        document.getElementById("modal-titulo").innerText = producto.nombre;
        document.getElementById("modal-precio").innerText = `$${producto.precio} MXN`;

        // Generar Link de WhatsApp
        const mensaje = `Hola, me interesa el par: ${producto.nombre} de $${producto.precio}. ¿Tienen tallas disponibles?`;
        const link = `https://wa.me/${TELEFONO_TIENDA}?text=${encodeURIComponent(mensaje)}`;

        document.getElementById("btn-whatsapp-modal").href = link;

        // Mostrar
        modal.style.display = "flex";
    }

    // 3. CERRAR MODAL
    closeBtn.onclick = () => modal.style.display = "none";
    window.onclick = (e) => {
        if (e.target == modal) modal.style.display = "none";
    }
});
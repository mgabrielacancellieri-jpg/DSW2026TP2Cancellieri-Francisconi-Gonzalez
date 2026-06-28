document.addEventListener("DOMContentLoaded", () => {
    
    // =========================================================
    // 1. SCRIPTS PARA EL ÍNDICE (index.html)
    // =========================================================
    const esInicio = document.querySelector('img[alt*="Nueva Colección Oliv"]');
    if (esInicio) {
        console.log("📍 Lógica de Inicio activa");
    }

    // =========================================================
    // 2. SCRIPTS PARA EL CATÁLOGO (catalogo.html)
    // =========================================================
    const grillaProductos = document.getElementById('grilla-productos');
    if (grillaProductos) {
        console.log("📍 Lógica de Catálogo activa (Filtros y Modal)");

        // A. Filtros inteligentes por URL (?categoria=...)
        const urlParams = new URLSearchParams(window.location.search);
        const categoriaFiltro = urlParams.get('categoria');
        const productos = document.querySelectorAll(".tarjeta-producto");

        if (categoriaFiltro) {
            productos.forEach(producto => {
                // Forzamos minúsculas para evitar problemas de tipeo
                const catProducto = producto.getAttribute("data-categoria").toLowerCase().trim();
                const catFiltro = categoriaFiltro.toLowerCase().trim();

                if (catProducto === catFiltro) {
                    producto.style.className = "col tarjeta-producto d-block"; // Asegura Bootstrap flex
                    producto.style.display = "block";
                } else {
                    producto.style.display = "none";
                }
            });
        } else {
            productos.forEach(producto => producto.style.display = "block");
        }

        // B. Ventana flotante (Modal) para ampliar fotos
        const modalElemento = document.getElementById('modalProducto');
        if (modalElemento) {
            const modal = new bootstrap.Modal(modalElemento);
            const modalImg = document.getElementById('modalImg');
            const modalNombre = document.getElementById('modalNombre');
            const modalPrecio = document.getElementById('modalPrecio');

            document.querySelectorAll(".btn-salmon").forEach(boton => {
                boton.addEventListener("click", function(e) {
                    const tarjeta = this.closest(".card");
                    const nombre = tarjeta.querySelector(".card-title").innerText;
                    
                    // Si es Reflejos del Bosque, va directo a la página
                    if (nombre.trim() === "Collar Reflejos del Bosque") {
                        return; 
                    }

                    e.preventDefault(); // Frena el link para los otros chokers
                    
                    const srcImg = tarjeta.querySelector("img").src;
                    const precio = tarjeta.querySelector(".card-text").innerText;

                    modalImg.src = srcImg;
                    modalNombre.innerText = nombre;
                    modalPrecio.innerText = precio;

                    modal.show();
                });
            });
        }
    }

    // =========================================================
    // 3. SCRIPTS PARA EL DETALLE DE PRODUCTO (producto-detalle.html)
    // =========================================================
    // Buscamos si existe la foto principal del detalle para activar la página
    const fotoPrincipal = document.getElementById('foto-principal');
    const btnFavorito = document.getElementById('btn-favorito');

    if (fotoPrincipal || btnFavorito) {
        console.log("📍 Lógica de Detalle de Producto activa (Miniaturas y Favoritos)");
        
        // A. Cambiar foto principal al tocar una miniatura
        document.querySelectorAll('.foto-miniatura').forEach(miniatura => {
            miniatura.addEventListener('click', function() {
                // Pasamos la ruta de la miniatura a la foto grande
                fotoPrincipal.src = this.src;
                
                // Efecto visual opcional: opacidad en la miniatura activa
                document.querySelectorAll('.foto-miniatura').forEach(m => m.style.opacity = '0.6');
                this.style.opacity = '1';
            });
        });

        // B. Funcionalidad del Botón Favoritos
            if (btnFavorito) {
            const toastFavoritoEl = document.getElementById('toast-favorito');
            const toastFavorito = toastFavoritoEl ? new bootstrap.Toast(toastFavoritoEl) : null;

            btnFavorito.addEventListener('click', function() {
                const icono = this.querySelector('i');
                icono.classList.toggle('bi-heart');
                icono.classList.toggle('bi-heart-fill');
                this.classList.toggle('btn-danger');
                this.classList.toggle('btn-outline-danger');

                // Mostrar el toast solo si se acaba de marcar como favorito
                if (icono.classList.contains('bi-heart-fill') && toastFavorito) {
                    toastFavorito.show();
                }
            });
        }
        
    }
});
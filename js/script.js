// ==============================
// VIKINGOS PIZZA - INTERACTIVIDAD
// ==============================

document.addEventListener("DOMContentLoaded", () => {

  // ==============================
  // PRODUCTO: cambiar cantidad
  // ==============================
  const contadorProducto = document.querySelector(".contador-producto");

  if (contadorProducto) {
    const botones = contadorProducto.querySelectorAll("button");
    const numero = contadorProducto.querySelector("span");

    let cantidad = 1;

    botones[0].addEventListener("click", () => {
      if (cantidad > 1) {
        cantidad--;
        numero.textContent = cantidad;
      }
    });

    botones[1].addEventListener("click", () => {
      cantidad++;
      numero.textContent = cantidad;
    });
  }

  // ==============================
  // PRODUCTO: seleccionar tamaño
  // ==============================
  const botonesTamano = document.querySelectorAll(".tamanos-producto button");
  const precioProducto = document.querySelector(".precio-grande");

  const precios = {
    "PEQUEÑA": "$ 28.900",
    "MEDIANA": "$ 33.900",
    "GRANDE": "$ 39.900"
  };

  botonesTamano.forEach((boton) => {
    boton.addEventListener("click", () => {
      botonesTamano.forEach((b) => b.classList.remove("activo"));
      boton.classList.add("activo");

      const texto = boton.textContent.toUpperCase();

      if (texto.includes("PEQUEÑA")) {
        precioProducto.textContent = precios["PEQUEÑA"];
      } else if (texto.includes("MEDIANA")) {
        precioProducto.textContent = precios["MEDIANA"];
      } else if (texto.includes("GRANDE")) {
        precioProducto.textContent = precios["GRANDE"];
      }
    });
  });

  // ==============================
  // PRODUCTO: miniaturas cambian imagen
  // ==============================
  const imagenPrincipal = document.querySelector(".producto-imagen-principal");
  const miniaturas = document.querySelectorAll(".miniaturas-producto img");

  if (imagenPrincipal && miniaturas.length > 0) {
    miniaturas.forEach((mini) => {
      mini.addEventListener("click", () => {
        imagenPrincipal.src = mini.src;
      });
    });
  }

  // ==============================
  // PRODUCTO: aviso al agregar carrito
  // ==============================
  const agregarCarrito = document.getElementById("agregarCarrito");

  if (agregarCarrito) {
    agregarCarrito.addEventListener("click", () => {
      alert("Producto agregado al carrito correctamente.");
    });
  }

  // ==============================
  // CARRITO: sumar / restar / eliminar
  // ==============================
  const itemsCarrito = document.querySelectorAll(".carrito-item");

  if (itemsCarrito.length > 0) {
    itemsCarrito.forEach((item) => {
      const cantidadDiv = item.querySelector(".cantidad");
      const precioDiv = item.querySelector(".precio");
      const subtotalDiv = item.querySelector(".subtotal");
      const eliminar = item.querySelector(".eliminar");

      let cantidad = obtenerCantidad(cantidadDiv.textContent);
      let precio = obtenerNumero(precioDiv.textContent);

      cantidadDiv.innerHTML = `
        <button class="menos">-</button>
        <span>${cantidad}</span>
        <button class="mas">+</button>
      `;

      const btnMenos = cantidadDiv.querySelector(".menos");
      const btnMas = cantidadDiv.querySelector(".mas");
      const spanCantidad = cantidadDiv.querySelector("span");

      btnMenos.addEventListener("click", () => {
        if (cantidad > 1) {
          cantidad--;
          spanCantidad.textContent = cantidad;
          subtotalDiv.textContent = formatoPrecio(precio * cantidad);
          actualizarTotalCarrito();
        }
      });

      btnMas.addEventListener("click", () => {
        cantidad++;
        spanCantidad.textContent = cantidad;
        subtotalDiv.textContent = formatoPrecio(precio * cantidad);
        actualizarTotalCarrito();
      });

      eliminar.addEventListener("click", () => {
        item.remove();
        actualizarTotalCarrito();
      });
    });

    actualizarTotalCarrito();
  }

  // ==============================
  // CHECKOUT: validación sencilla
  // ==============================
  const btnConfirmar = document.querySelector(".checkout-container .btn-confirm");

  if (btnConfirmar) {
    btnConfirmar.addEventListener("click", (e) => {
      const inputs = document.querySelectorAll(".checkout-form input");
      let completo = true;

      inputs.forEach((input) => {
        if (input.value.trim() === "") {
          completo = false;
          input.style.border = "2px solid red";
        } else {
          input.style.border = "1px solid #999";
        }
      });

      if (!completo) {
        e.preventDefault();
        alert("Por favor completa los campos obligatorios antes de confirmar el pedido.");
      }
    });
  }

});

// ==============================
// FUNCIONES AUXILIARES
// ==============================

function obtenerNumero(texto) {
  return Number(texto.replace(/[^0-9]/g, ""));
}

function obtenerCantidad(texto) {
  const numero = texto.match(/\d+/);
  return numero ? Number(numero[0]) : 1;
}

function formatoPrecio(numero) {
  return "$ " + numero.toLocaleString("es-CO");
}

function actualizarTotalCarrito() {
  const subtotales = document.querySelectorAll(".carrito-item .subtotal");
  let subtotal = 0;

  subtotales.forEach((item) => {
    subtotal += obtenerNumero(item.textContent);
  });

  const domicilio = 3500;
  const descuento = 2000;
  const total = subtotal + domicilio - descuento;

  const resumenLineas = document.querySelectorAll(".carrito-resumen .price-line strong");
  const totalResumen = document.querySelector(".carrito-resumen .price-total strong");

  if (resumenLineas.length >= 3 && totalResumen) {
    resumenLineas[0].textContent = formatoPrecio(subtotal);
    resumenLineas[1].textContent = formatoPrecio(domicilio);
    resumenLineas[2].textContent = "- " + formatoPrecio(descuento);
    totalResumen.textContent = formatoPrecio(total);
  }
}
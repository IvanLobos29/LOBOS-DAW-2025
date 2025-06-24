document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.querySelector(".formulario");
    const saludo = document.createElement("h2");
    saludo.textContent = "HOLA";
    saludo.style.marginBottom = "20px";
    formulario.insertBefore(saludo, formulario.firstChild);

    const campos = [
        {
            label: "Nombre Completo",
            id: "nombre",
            validar: (v) => v.length > 6 && v.includes(" "),
            mensaje: "Debe tener más de 6 letras y al menos un espacio.",
        },
        {
            label: "Correo Electrónico",
            id: "email",
            validar: (v) => v.includes("@") && v.includes("."),
            mensaje: "Formato de email inválido.",
        },
        {
            label: "Contraseña",
            id: "password",
            validar: (v) => v.length >= 8 && /[a-zA-Z]/.test(v) && /[0-9]/.test(v),
            mensaje: "Debe tener al menos 8 caracteres con letras y números.",
        },
        {
            label: "Edad",
            id: "edad",
            validar: (v) => !isNaN(v) && parseInt(v) >= 18,
            mensaje: "Debe ser mayor o igual a 18.",
        },
        {
            label: "Teléfono",
            id: "telefono",
            validar: (v) => v.length >= 7 && !isNaN(v),
            mensaje: "Número inválido, mínimo 7 dígitos.",
        },
        {
            label: "Dirección",
            id: "direccion",
            validar: (v) =>
                v.length >= 5 &&
                /[a-zA-Z]/.test(v) &&
                /\d/.test(v) &&
                v.includes(" "),
            mensaje: "Debe tener letras, números y un espacio.",
        },
        {
            label: "Ciudad",
            id: "ciudad",
            validar: (v) => v.length >= 3,
            mensaje: "Debe tener al menos 3 caracteres.",
        },
        {
            label: "Código Postal",
            id: "codigo",
            validar: (v) => v.length >= 3,
            mensaje: "Debe tener al menos 3 caracteres.",
        },
        {
            label: "DNI",
            id: "DNI",
            validar: (v) => (v.length === 7 || v.length === 8) && !isNaN(v),
            mensaje: "Debe tener 7 u 8 dígitos numéricos.",
        },
    ];

    const datosGuardados = localStorage.getItem("datosSuscripcion");
    if (datosGuardados) {
        const datos = JSON.parse(datosGuardados);
        campos.forEach(({ id }) => {
            const input = document.getElementById(id);
            if (input && datos[id]) input.value = datos[id];
        });
    }

    const nombreInput = document.getElementById("nombre");
    nombreInput.addEventListener("input", () => {
        const nombre = nombreInput.value.trim();
        saludo.textContent = nombre ? `HOLA ${nombre.toUpperCase()}` : "HOLA";
    });

    formulario.addEventListener("submit", function (e) {
        e.preventDefault();

        let errores = 0;
        let mensaje = "";
        const datos = {};

        campos.forEach(({ id, label, validar, mensaje: msj }) => {
            const input = document.getElementById(id);
            const valor = input.value.trim();
            const valido = validar(valor);

            const errorEl = input.parentElement.querySelector(".error");
            if (errorEl) errorEl.remove();

            if (!valido) {
                errores++;
                mensaje += `- ${label}: ${msj}\n`;
                const errorDiv = document.createElement("div");
                errorDiv.className = "error";
                errorDiv.style.color = "red";
                errorDiv.style.marginTop = "5px";
                errorDiv.textContent = msj;
                input.parentElement.appendChild(errorDiv);
            } else {
                datos[id] = valor;
            }
        });

        if (errores > 0) {
            alert("Errores encontrados:\n" + mensaje);
            return;
        }

        const query = new URLSearchParams(datos).toString();
        const url = "https://jsonplaceholder.typicode.com/posts?" + query;

        fetch(url)
            .then(() => {
                mostrarModal("Suscripción exitosa", JSON.stringify(datos, null, 2));
                localStorage.setItem("datosSuscripcion", JSON.stringify(datos));
            })
            .catch((error) => {
                mostrarModal("Error al enviar", error.message);
            });
    });

    function mostrarModal(titulo, mensaje) {
        const modal = document.getElementById("modal");
        document.getElementById("modalTitulo").textContent = titulo;
        document.getElementById("modalMensaje").textContent = mensaje;
        modal.classList.remove("oculto");
    }

    document.getElementById("cerrarModal").addEventListener("click", () => {
        document.getElementById("modal").classList.add("oculto");
    });
});

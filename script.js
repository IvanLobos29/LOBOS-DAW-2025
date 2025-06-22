document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.querySelector(".formulario");
    const inputs = formulario.querySelectorAll("input");
    const nombreInput = document.getElementById("nombre");

    const titulo = document.createElement("h2");
    titulo.textContent = "HOLA";
    titulo.style.marginBottom = "20px";
    formulario.insertBefore(titulo, formulario.firstChild);

    nombreInput.addEventListener("focus", actualizarTitulo);
    nombreInput.addEventListener("keydown", actualizarTitulo);

    function actualizarTitulo() {
        setTimeout(() => {
            const nombre = nombreInput.value.trim();
            titulo.textContent = nombre ? `HOLA ${nombre}` : "HOLA";
        }, 0);
    }

    inputs.forEach(input => {
        input.addEventListener("blur", () => validarCampo(input));
        input.addEventListener("focus", () => limpiarError(input));
    });

    formulario.addEventListener("submit", function (e) {
        e.preventDefault();
        let errores = [];
        let datos = [];

        inputs.forEach(input => {
            const valido = validarCampo(input);
            if (!valido.ok) {
                errores.push(valido.mensaje);
            } else {
                datos.push(`${input.placeholder}: ${input.value}`);
            }
        });

        if (errores.length > 0) {
            alert("Errores encontrados:\n" + errores.join("\n"));
        } else {
            alert("Datos ingresados:\n" + datos.join("\n"));
        }
    });

    function mostrarError(input, mensaje) {
        let error = input.parentElement.querySelector(".error");
        if (!error) {
            error = document.createElement("div");
            error.className = "error";
            error.style.color = "red";
            error.style.marginTop = "5px";
            input.parentElement.appendChild(error);
        }
        error.textContent = mensaje;
    }

    function limpiarError(input) {
        const error = input.parentElement.querySelector(".error");
        if (error) error.remove();
    }

    function validarCampo(input) {
        const valor = input.value.trim();
        const id = input.id;
        let mensaje = "";

        switch (id) {
            case "nombre":
                if (valor.length <= 6 || !valor.includes(" ")) {
                    mensaje = "Debe tener más de 6 letras y un espacio.";
                }
                break;
            case "email":
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) {
                    mensaje = "Formato de email inválido.";
                }
                break;
            case "password":
                if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(valor)) {
                    mensaje = "Al menos 8 caracteres con letras y números.";
                }
                break;
            case "edad":
                if (!/^[0-9]+$/.test(valor) || parseInt(valor) < 18) {
                    mensaje = "Debe ser un número mayor o igual a 18.";
                }
                break;
            case "telefono":
                if (!/^\d{7,}$/.test(valor)) {
                    mensaje = "Número inválido, mínimo 7 dígitos, sin símbolos.";
                }
                break;
            case "direccion":
                if (valor.length < 5 || !/\d/.test(valor) || !/[a-zA-Z]/.test(valor) || !valor.includes(" ")) {
                    mensaje = "Debe tener letras, números y un espacio.";
                }
                break;
            case "ciudad":
                if (valor.length < 3) {
                    mensaje = "Mínimo 3 caracteres.";
                }
                break;
            case "codigo":
                if (valor.length < 3) {
                    mensaje = "Mínimo 3 caracteres.";
                }
                break;
            case "DNI":
                if (!/^\d{7,8}$/.test(valor)) {
                    mensaje = "Debe tener 7 u 8 dígitos numéricos.";
                }
                break;
        }

        if (mensaje) {
            mostrarError(input, mensaje);
            return { ok: false, mensaje };
        }
        return { ok: true };
    }
});

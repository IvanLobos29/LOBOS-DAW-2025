document.addEventListener("DOMContentLoaded", () => {
    const filtrosForm = document.getElementById("form-filtros");
    const btnMostrarTodos = document.getElementById("btn-todos");
    const contenedorResultados = document.getElementById("resultados");
    const anterior = document.getElementById("ant-pagina");
    const siguiente = document.getElementById("sig-pagina");
    const indicadorPagina = document.getElementById("info-pagina");

    const entradasFiltro = {
        nombre: document.getElementById("filtro-nombre"),
        estado: document.getElementById("filtro-estado"),
        especie: document.getElementById("filtro-especie"),
        tipo: document.getElementById("filtro-tipo"),
        genero: document.getElementById("filtro-genero")
    };

    let pagina = 1;
    let paginasTotales = 1;
    let ultimaBusqueda = "https://rickandmortyapi.com/api/character";

    const construirQuery = () => {
        const query = new URLSearchParams();
        for (let clave in entradasFiltro) {
            const valor = entradasFiltro[clave].value.trim();
            if (valor) {
                const param = clave === "nombre" ? "name" : clave;
                query.append(param, valor);
            }
        }
        return query.toString();
    };

    const consultarAPI = (url) => {
        contenedorResultados.innerHTML = "<p>Cargando personajes...</p>";
        fetch(url)
            .then(resp => {
                if (!resp.ok) throw new Error("Error: " + resp.status);
                return resp.json();
            })
            .then(data => {
                pagina = parseInt(new URL(url).searchParams.get("page")) || 1;
                paginasTotales = data.info.pages;

                const base = new URL(url);
                base.searchParams.delete("page");
                ultimaBusqueda = base.href;

                const ruta = window.location.origin + window.location.pathname;
                window.history.pushState({}, "", `${ruta}?page=${pagina}`);

                actualizarPaginacion();
                renderizarPersonajes(data.results);
            })
            .catch(err => {
                contenedorResultados.innerHTML = `<p class="error">${err.message}</p>`;
            });
    };

    const renderizarPersonajes = (personajes) => {
        contenedorResultados.innerHTML = "";
        if (!personajes || personajes.length === 0) {
            contenedorResultados.innerHTML = "<p>No se encontraron resultados.</p>";
            return;
        }

        personajes.forEach(p => {
            const card = document.createElement("div");
            card.className = "tarjeta-personaje";
            card.innerHTML = `
                <img src="${p.image}" alt="${p.name}" />
                <div class="info-personaje">
                    <h4>${p.name}</h4>
                    <p>Estado: ${p.status}</p>
                    <p>Especie: ${p.species}</p>
                    <p>Tipo: ${p.type || "Desconocido"}</p>
                    <p>Género: ${p.gender}</p>
                </div>
            `;
            contenedorResultados.appendChild(card);
        });
    };

    const actualizarPaginacion = () => {
        indicadorPagina.textContent = `Página ${pagina} de ${paginasTotales}`;
        anterior.disabled = pagina <= 1;
        siguiente.disabled = pagina >= paginasTotales;
    };

    filtrosForm.addEventListener("submit", e => {
        e.preventDefault();
        pagina = 1;
        const queryStr = construirQuery();
        const url = queryStr
            ? `https://rickandmortyapi.com/api/character?${queryStr}`
            : "https://rickandmortyapi.com/api/character";
        consultarAPI(url);
    });

    btnMostrarTodos.addEventListener("click", () => {
        pagina = 1;
        consultarAPI("https://rickandmortyapi.com/api/character");
    });

    anterior.addEventListener("click", () => {
        if (pagina > 1) {
            const u = new URL(ultimaBusqueda);
            u.searchParams.set("page", pagina - 1);
            consultarAPI(u.href);
        }
    });

    siguiente.addEventListener("click", () => {
        if (pagina < paginasTotales) {
            const u = new URL(ultimaBusqueda);
            u.searchParams.set("page", pagina + 1);
            consultarAPI(u.href);
        }
    });

    const pageInicial = parseInt(new URLSearchParams(window.location.search).get("page"));
    if (pageInicial && pageInicial > 1) {
        pagina = pageInicial;
        consultarAPI(`https://rickandmortyapi.com/api/character?page=${pagina}`);
    } else {
        consultarAPI("https://rickandmortyapi.com/api/character");
    }
});

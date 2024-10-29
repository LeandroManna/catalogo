const apiKey = 'AIzaSyAo5SJwMwxUocMZNg3xE4JZnQMViW_-Jw0';
const spreadsheetId = '1fYdJY-R13RBUabHHuuuHKTPtiC8kLB2QH0q5IWRx3iM';
const range = 'Catalogo!A2:H'; // Rango que incluye las filas con datos sin el encabezado

const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}?key=${apiKey}`;

async function fetchProducts() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        const rows = data.values;
        
        if (rows.length > 0) {
            renderProducts(rows);
        } else {
            console.log('No se encontraron productos en la hoja de cálculo.');
        }
    } catch (error) {
        console.error('Error al obtener datos del Google Sheet:', error);
    }
}

function renderProducts(products) {
    const productosContainer = document.getElementById('productos');
    productosContainer.innerHTML = '';

    products.forEach(product => {
        const [id, nombre, categoria, tipo, precio, imagen1, imagen2, stock] = product;

        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';

        card.innerHTML = `
            <div class="card h-100">
                <div id="carousel-${id}" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <img src="${imagen1}" class="d-block w-100" alt="${nombre}">
                        </div>
                        ${imagen2 ? `<div class="carousel-item"><img src="${imagen2}" class="d-block w-100" alt="${nombre}"></div>` : ''}
                    </div>
                    <button class="carousel-control-prev" type="button" data-bs-target="#carousel-${id}" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Anterior</span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#carousel-${id}" data-bs-slide="next">
                        <span class="carousel-control-next-icon" aria-hidden="true"></span>
                        <span class="visually-hidden">Siguiente</span>
                    </button>
                </div>
                <div class="card-body">
                    <h5 class="card-title">${nombre}</h5>
                    <p class="card-text">Categoría: ${categoria}</p>
                    <p class="card-text">Tipo: ${tipo}</p>
                    <p class="card-text">Precio: $${precio}</p>
                    <p class="card-text">Stock: ${stock}</p>
                </div>
            </div>
        `;

        productosContainer.appendChild(card);
    });
}

// Llama a la función para obtener y mostrar los productos al cargar la página
fetchProducts();

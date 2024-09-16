// Al cargar la página, recupera las imágenes y textos del LocalStorage
window.onload = function() {
    loadFromLocalStorage();
};

// Manejar la carga de nuevas imágenes y textos
document.getElementById("uploadForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Evita que la página se recargue al enviar el formulario

    const imageInput = document.getElementById("imageInput").files[0];  // Obtener la imagen seleccionada
    const textInput = document.getElementById("textInput").value;  // Obtener el texto ingresado
    
    if (imageInput && textInput) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageDataURL = e.target.result;  // Obtener la URL de la imagen

            // Agregar la imagen y el texto al DOM
            addImageToGrid(imageDataURL, textInput);

            // Guardar la imagen y el texto en LocalStorage
            saveToLocalStorage(imageDataURL, textInput);

            // Limpiar el formulario
            document.getElementById("uploadForm").reset();
        };

        // Leer la imagen como una URL de datos
        reader.readAsDataURL(imageInput);
    } else {
        alert("Please upload an image and enter text.");
    }
});

// Función para agregar una imagen y texto a la cuadrícula
function addImageToGrid(imageDataURL, text) {
    const grid = document.getElementById("grid");

    // Crear un nuevo elemento de la cuadrícula
    const gridItem = document.createElement("div");
    gridItem.className = "grid-item";

    // Crear el elemento de la imagen
    const img = document.createElement("img");
    img.src = imageDataURL;

    // Crear el elemento de la descripción
    const description = document.createElement("p");
    description.textContent = text;

    // Añadir la imagen y la descripción al nuevo ítem de la cuadrícula
    gridItem.appendChild(img);
    gridItem.appendChild(description);

    // Añadir el ítem a la cuadrícula
    grid.appendChild(gridItem);
}

// Función para guardar la imagen y el texto en LocalStorage
function saveToLocalStorage(imageDataURL, text) {
    let items = JSON.parse(localStorage.getItem('uploadedItems')) || [];
    items.push({ image: imageDataURL, description: text });
    localStorage.setItem('uploadedItems', JSON.stringify(items));
}

// Función para cargar las imágenes y textos desde LocalStorage
function loadFromLocalStorage() {
    let items = JSON.parse(localStorage.getItem('uploadedItems')) || [];
    items.forEach(item => {
        addImageToGrid(item.image, item.description);
    });
}

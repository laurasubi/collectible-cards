document.getElementById('designForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Recoger los datos del formulario
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const color = document.getElementById('color').value;

    // Crear el diseño con los datos proporcionados
    const output = document.getElementById('output');
    output.innerHTML = `
        <div id="designOutput" class="design-output" style="border-color: ${color};">
            <h2 style="color: ${color};">${title}</h2>
            <p>${description}</p>
        </div>
    `;

    // Mostrar el botón de exportación
    document.getElementById('exportBtn').style.display = 'block';

    // Almacenar los datos localmente
    const designs = JSON.parse(localStorage.getItem('designs')) || [];
    designs.push({ title, description, color });
    localStorage.setItem('designs', JSON.stringify(designs));
    loadSavedDesigns();
});

// Manejar la exportación
document.getElementById('exportBtn').addEventListener('click', function() {
    const designOutput = document.getElementById('designOutput');

    // Usar html2canvas para capturar el diseño como una imagen
    html2canvas(designOutput).then(canvas => {
        // Crear un PDF a partir del canvas
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'PNG', 10, 10);
        pdf.save('design.pdf');
    });
});

// Función para mostrar diseños guardados
function loadSavedDesigns() {
    const savedDesigns = JSON.parse(localStorage.getItem('designs')) || [];
    const savedDesignsContainer = document.getElementById('savedDesigns');
    savedDesignsContainer.innerHTML = '';  // Limpiar la sección

    savedDesigns.forEach((design, index) => {
        const designElement = document.createElement('div');
        designElement.classList.add('design-output');
        designElement.style.borderColor = design.color;
        designElement.innerHTML = `
            <h2 style="color: ${design.color};">${design.title}</h2>
            <p>${design.description}</p>
            <button onclick="deleteDesign(${index})">Eliminar</button>
        `;
        savedDesignsContainer.appendChild(designElement);
    });
}

// Función para eliminar un diseño
function deleteDesign(index) {
    let designs = JSON.parse(localStorage.getItem('designs')) || [];
    designs.splice(index, 1);
    localStorage.setItem('designs', JSON.stringify(designs));
    loadSavedDesigns();  // Recargar la lista de diseños
}

// Cargar los diseños guardados al inicio
loadSavedDesigns();

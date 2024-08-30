document.getElementById('designForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Recoger los datos del formulario
    const title = document.getElementById('title').value;
    const date = document.getElementById('date').value;
    const designer = document.getElementById('designer').value;
    const description = document.getElementById('description').value;
    const imageUrl = document.getElementById('imageUrl').value;

    // Crear la postal con los datos proporcionados
    const output = document.getElementById('output');
    output.innerHTML = `
        <div class="postal front">
            <div class="content">
                <h2>${title}</h2>
                <p>Fecha: ${date}</p>
                <p>Diseñadora: ${designer}</p>
                <p>${description}</p>
            </div>
        </div>
        <div class="postal back">
            <img src="${imageUrl}" alt="Postal Image">
        </div>
    `;

    // Mostrar el botón de exportación
    document.getElementById('exportBtn').style.display = 'block';

    // Almacenar los datos localmente
    const designs = JSON.parse(localStorage.getItem('designs')) || [];
    designs.push({ title, date, designer, description, imageUrl });
    localStorage.setItem('designs', JSON.stringify(designs));
    loadSavedDesigns();
});

// Manejar la exportación
document.getElementById('exportBtn').addEventListener('click', function() {
    const front = document.querySelector('.front');
    const back = document.querySelector('.back');

    // Capturar el lado frontal como una imagen
    html2canvas(front).then(frontCanvas => {
        // Capturar el lado posterior como una imagen
        html2canvas(back).then(backCanvas => {
            const pdf = new jsPDF('p', 'mm', 'a4');

            // Añadir la imagen frontal al PDF
            const frontImgData = frontCanvas.toDataURL('image/png');
            pdf.addImage(frontImgData, 'PNG', 10, 10, 190, 135);

            // Añadir la imagen posterior al PDF
            pdf.addPage();
            const backImgData = backCanvas.toDataURL('image/png');
            pdf.addImage(backImgData, 'PNG', 10, 10, 190, 135);

            // Descargar el PDF
            pdf.save('postal.pdf');
        });
    });
});

// Función para mostrar diseños guardados
function loadSavedDesigns() {
    const savedDesigns = JSON.parse(localStorage.getItem('designs')) || [];
    const savedDesignsContainer = document.getElementById('savedDesigns');
    savedDesignsContainer.innerHTML = '';  // Limpiar la sección

    savedDesigns.forEach((design, index) => {
        const designElement = document.createElement('div');
        designElement.classList.add('postal');
        designElement.innerHTML = `
            <div class="front">
                <div class="content">
                    <h2>${design.title}</h2>
                    <p>Fecha: ${design.date}</p>
                    <p>Diseñadora: ${design.designer}</p>
                    <p>${design.description}</p>
                </div>
            </div>
            <div class="back">
                <img src="${design.imageUrl}" alt="Postal Image">
            </div>
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

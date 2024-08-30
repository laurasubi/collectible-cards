document.getElementById('designForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const year = document.getElementById('year').value;
    const designer = document.getElementById('designer').value;
    const description = document.getElementById('description').value;
    const imageUpload = document.getElementById('imageUpload').files[0];

    const reader = new FileReader();
    reader.onload = function(event) {
        const output = document.getElementById('output');
        output.innerHTML = `
            <div class="postal">
                <div class="image-section">
                    <img src="${event.target.result}" alt="Postal Image">
                </div>
                <div class="text-section">
                    <h2>${title}</h2>
                    <p>Año de Creación: ${year}</p>
                    <p>Diseñadora: ${designer}</p>
                    <p>${description}</p>
                </div>
            </div>
        `;

        // Mostrar el botón de exportación
        document.getElementById('exportBtn').style.display = 'block';

        // Guardar en localStorage
        const designs = JSON.parse(localStorage.getItem('designs')) || [];
        designs.push({ title, year, designer, description, imageData: event.target.result });
        localStorage.setItem('designs', JSON.stringify(designs));
        loadSavedDesigns();
    };
    reader.readAsDataURL(imageUpload);
});

document.getElementById('exportBtn').addEventListener('click', function() {
    const postal = document.querySelector('.postal');
    const scale = 300 / 25.4; // Convertir a 300 dpi (25.4 mm = 1 pulgada)

    html2canvas(postal, { scale: scale }).then(canvas => {
        const pdf = new jsPDF('p', 'mm', [85, 120]);
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0, 85, 120);
        pdf.save('postal.pdf');
    });
});

function loadSavedDesigns() {
    const savedDesigns = JSON.parse(localStorage.getItem('designs')) || [];
    const savedDesignsContainer = document.getElementById('savedDesigns');
    savedDesignsContainer.innerHTML = '';

    savedDesigns.forEach((design, index) => {
        const designElement = document.createElement('div');
        designElement.classList.add('postal');
        designElement.innerHTML = `
            <div class="image-section">
                <img src="${design.imageData}" alt="Postal Image">
            </div>
            <div class="text-section">
                <h2>${design.title}</h2>
                <p>Año de Creación: ${design.year}</p>
                <p>Diseñadora: ${design.designer}</p>
                <p>${design.description}</p>
            </div>
            <button onclick="deleteDesign(${index})">Eliminar</button>
        `;
        savedDesignsContainer.appendChild(designElement);
    });
}

function deleteDesign(index) {
    let designs = JSON.parse(localStorage.getItem('designs')) || [];
    designs.splice(index, 1);
    localStorage.setItem('designs', JSON.stringify(designs));
    loadSavedDesigns();
}

loadSavedDesigns();

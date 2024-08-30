document.getElementById('exportBtn').addEventListener('click', function() {
    const postal = document.querySelector('.postal');

    // Dimensiones en píxeles para 300 dpi
    const widthInPx = 8.5 * 300 / 2.54; // convertir cm a pulgadas y luego a píxeles
    const heightInPx = 6 * 300 / 2.54; 

    html2canvas(postal, {
        scale: 1,  // No necesitamos escalar más allá de las dimensiones especificadas
        width: widthInPx,
        height: heightInPx,
        useCORS: true
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png', 1.0);  // Calidad 1.0 para PNG
        const pdf = new jsPDF('p', 'mm', [85, 60]); // Tamaño de la postal en mm

        // Agregar la imagen al PDF con las dimensiones correctas en milímetros
        pdf.addImage(imgData, 'PNG', 0, 0, 85, 60);
        pdf.save('postal.pdf');
    });
});

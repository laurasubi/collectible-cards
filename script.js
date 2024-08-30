document.getElementById('exportBtn').addEventListener('click', function() {
    const postal = document.querySelector('.postal');
    
    // 85mm x 120mm in pixels at 300dpi
    const widthInPx = 85 * 11.81;  // Convert mm to pixels (300dpi => 11.81px per mm)
    const heightInPx = 120 * 11.81;
    
    html2canvas(postal, {
        scale: 3,  // Scale the canvas to get higher resolution
        width: widthInPx,
        height: heightInPx,
        useCORS: true
    }).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', [85, 120]);
        
        // Add the image to the PDF with the correct dimensions
        pdf.addImage(imgData, 'PNG', 0, 0, 85, 120);
        pdf.save('postal.pdf');
    });
});

document.getElementById("uploadForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const imageInput = document.getElementById("imageInput").files[0];
    const textInput = document.getElementById("textInput").value;
    
    if (imageInput && textInput) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const grid = document.getElementById("grid");

            const gridItem = document.createElement("div");
            gridItem.className = "grid-item";

            const img = document.createElement("img");
            img.src = e.target.result;

            const description = document.createElement("p");
            description.textContent = textInput;

            gridItem.appendChild(img);
            gridItem.appendChild(description);
            grid.appendChild(gridItem);
        }
        
        reader.readAsDataURL(imageInput);
    } else {
        alert("Please upload an image and enter text.");
    }
});

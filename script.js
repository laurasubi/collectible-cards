document.getElementById("uploadForm").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent the form from refreshing the page

    const imageInput = document.getElementById("imageInput").files[0];  // Get the image file
    const textInput = document.getElementById("textInput").value;  // Get the text input
    
    if (imageInput && textInput) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const grid = document.getElementById("grid");

            // Create a new grid item
            const gridItem = document.createElement("div");
            gridItem.className = "grid-item";

            // Create the image element
            const img = document.createElement("img");
            img.src = e.target.result;  // Use the image file's data URL

            // Create the description element
            const description = document.createElement("p");
            description.textContent = textInput;  // Use the text input as the description

            // Append the image and text to the grid item
            gridItem.appendChild(img);
            gridItem.appendChild(description);

            // Add the grid item to the grid
            grid.appendChild(gridItem);

            // Clear the form inputs
            document.getElementById("uploadForm").reset();
        };

        // Read the image file as a data URL
        reader.readAsDataURL(imageInput);
    } else {
        alert("Please upload an image and enter text.");
    }
});

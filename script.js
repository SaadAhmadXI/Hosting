document.addEventListener("DOMContentLoaded", function() {
    const thumbnailContainer = document.getElementById("thumbnailContainer");
    const searchInput = document.getElementById("searchInput");

    const subdirectories = [
        { name: "Battlefield 1", thumbnail: "Battlefield 1/thumbnail.jpg", url: "https://onelinkgames.site/Battlefield 1" },
        { name: "Elden Ring", thumbnail: "Elden Ring/thumbnail.jpg", url: "https://onelinkgames.site/Elden Ring" },
        { name: "FlatOut 4 Total Insanity", thumbnail: "FlatOut 4 Total Insanity/thumbnail.jpg", url: "https://onelinkgames.site/FlatOut 4 Total Insanity" },
        { name: "Vosphia", thumbnail: "Vosphia/thumbnail.jpg", url: "https://onelinkgames.site/Vosphia" },
        { name: "Hogwarts Legacy", thumbnail: "Hogwarts Legacy/thumbnail.jpg", url: "https://onelinkgames.site/Hogwarts Legacy" },
        { name: "Forza Horizan 5", thumbnail: "Forza Horizan 5/thumbnail.jpg", url: "https://onelinkgames.site/Forza Horizan 5" },
        // Add more subdirectories here
    ];

    function refreshThumbnails(filterText) {
        thumbnailContainer.innerHTML = "";

        subdirectories.forEach(subdirectory => {
            if (subdirectory.name.toLowerCase().includes(filterText.toLowerCase())) {
                const thumbnailBox = createThumbnailBox(subdirectory.name, subdirectory.thumbnail, subdirectory.url);
                thumbnailContainer.appendChild(thumbnailBox);
            }
        });
    }

    searchInput.addEventListener("input", function() {
        const filterText = searchInput.value.toLowerCase(); // Convert input to lowercase
        refreshThumbnails(filterText);
    });

    refreshThumbnails(""); // Initial load
});

function createThumbnailBox(name, thumbnail, url) {
    const thumbnailBox = document.createElement("div");
    thumbnailBox.className = "box";

    const thumbnailLink = document.createElement("a"); // Create anchor element
    thumbnailLink.href = url; // Set URL
    thumbnailLink.target = "_blank"; // Open in a new tab
    thumbnailLink.rel = "noopener noreferrer"; // Security best practice

    const thumbnailImage = document.createElement("img");
    thumbnailImage.src = thumbnail;
    thumbnailImage.alt = "Thumbnail";

    const thumbnailTitle = document.createElement("p");
    thumbnailTitle.className = "name";
    thumbnailTitle.textContent = name;

    thumbnailLink.appendChild(thumbnailImage); // Append image to the anchor
    thumbnailLink.appendChild(thumbnailTitle); // Append title to the anchor
    thumbnailBox.appendChild(thumbnailLink); // Append anchor to the thumbnail box

    return thumbnailBox;
}

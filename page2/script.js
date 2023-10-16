import { allSubdirectories } from '../data.js';

const pageSubdirectories = allSubdirectories.slice(0, 2);

document.addEventListener("DOMContentLoaded", function() {
    const thumbnailContainer = document.querySelector(".body");

    function displaySubdirectories(subdirectories) {
        thumbnailContainer.innerHTML = "";

        subdirectories.forEach(subdirectory => {
            const thumbnailBox = createThumbnailBox(subdirectory.name, subdirectory.thumbnail, subdirectory.url);
            thumbnailContainer.appendChild(thumbnailBox);
        });
    }

    function createThumbnailBox(name, thumbnail, url) {
        const thumbnailBox = document.createElement("div");
        thumbnailBox.className = "box";

        const thumbnailLink = document.createElement("a");
        thumbnailLink.href = url;
        thumbnailLink.target = "_blank";
        thumbnailLink.rel = "noopener noreferrer";

        const thumbnailImage = document.createElement("img");
        thumbnailImage.src = thumbnail;
        thumbnailImage.alt = "Thumbnail";

        const thumbnailTitle = document.createElement("p");
        thumbnailTitle.className = "name";
        thumbnailTitle.textContent = name;

        thumbnailLink.appendChild(thumbnailImage);
        thumbnailLink.appendChild(thumbnailTitle);
        thumbnailBox.appendChild(thumbnailLink);

        return thumbnailBox;
    }

    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", function() {
        const filterText = searchInput.value;
        if (filterText === "") {
            // If the search input is cleared, show all subdirectories again
            displaySubdirectories(pageSubdirectories);
        } else {
            const filteredSubdirectories = allSubdirectories.filter(subdirectory => subdirectory.name.toLowerCase().includes(filterText.toLowerCase()));
            displaySubdirectories(filteredSubdirectories);
        }
    });

    // Initial load of thumbnails
    displaySubdirectories(pageSubdirectories);
});

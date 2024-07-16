import { allSubdirectories } from '../data.js';

const pageSubdirectories = allSubdirectories.slice(0, 18);

document.addEventListener("DOMContentLoaded", function() {
    const thumbnailContainer = document.querySelector(".body");
    const categoryFilter = document.querySelector("#categoryFilter");

    function displaySubdirectories(subdirectories) {
        thumbnailContainer.innerHTML = "";

        subdirectories.forEach(subdirectory => {
            const thumbnailBox = createThumbnailBox(subdirectory.name, subdirectory.thumbnail, subdirectory.url, subdirectory.categories, subdirectory.specialClass);
            thumbnailContainer.appendChild(thumbnailBox);
        });
    }

    function createThumbnailBox(name, thumbnail, url, categories, specialClass) {
        const thumbnailBox = document.createElement("div");
        thumbnailBox.className = "box";

        // Add category as a data attribute
        thumbnailBox.dataset.categories = categories;

        if (specialClass) {
            thumbnailBox.classList.add(specialClass);
        }

        const thumbnailLink = document.createElement("a");
        thumbnailLink.href = url;
        thumbnailLink.target = "_blank";
        thumbnailLink.rel = "noopener noreferrer";

        const thumbnailImageBox = document.createElement("div");
        thumbnailImageBox.className = "Imagebox";

        const thumbnailImage = document.createElement("img");
        thumbnailImage.src = thumbnail;
        thumbnailImage.alt = "Thumbnail";

        const thumbnailTitle = document.createElement("p");
        thumbnailTitle.className = "name";
        thumbnailTitle.textContent = name;

        thumbnailLink.appendChild(thumbnailImage);
        thumbnailLink.appendChild(thumbnailImageBox);
        thumbnailLink.appendChild(thumbnailTitle);
        thumbnailImageBox.appendChild(thumbnailImage);
        thumbnailBox.appendChild(thumbnailLink);

        return thumbnailBox;
    }

    // Handle category filter changes
    categoryFilter.addEventListener("change", function() {
        const selectedCategory = categoryFilter.value;
    
        console.log("Selected Category:", selectedCategory);
    
        if (selectedCategory === "All") {
            displaySubdirectories(pageSubdirectories);
        } else {
            const filteredSubdirectories = allSubdirectories.filter(subdirectory => {
                return subdirectory.categories && subdirectory.categories.includes(selectedCategory);
            });
            displaySubdirectories(filteredSubdirectories);
        }
    });

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

document.addEventListener("DOMContentLoaded", function () {
    fetch('../pages.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('imported-content').innerHTML = data;
        })
        .catch(error => {
            console.error('Error fetching content: ', error);
        });
});

function categoryText() {
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;

    if (windowWidth < 850) {
        document.getElementById("cat1").innerHTML = '';
        document.getElementById("cat").innerHTML = `
        <label for="categoryFilter" class="catbutton">Category:</label>
        <select id="categoryFilter" class="catlist">
        <option value="All">All</option>
        <option value="Action">Action</option>
        <option value="Adventure">Adventure</option>
        <option value="Open World">Open World</option>
        <option value="Shooting">Shooting</option>
        <option value="Racing">Racing</option>
        <option value="Fighting">Fighting</option>
        <option value="Horror">Horror</option>
        <option value="Survival">Survival</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="RPG">RPG</option>
        <option value="Sports">Sports</option>
        </select>`;
    }
    else {
        document.getElementById("cat").innerHTML = '';
        document.getElementById("cat1").innerHTML = `
        <label for="categoryFilter" class="catbutton">Category:</label>
        <select id="categoryFilter" class="catlist">
        <option value="All">All</option>
        <option value="Action">Action</option>
        <option value="Adventure">Adventure</option>
        <option value="Open World">Open World</option>
        <option value="Shooting">Shooting</option>
        <option value="Racing">Racing</option>
        <option value="Fighting">Fighting</option>
        <option value="Horror">Horror</option>
        <option value="Survival">Survival</option>
        <option value="Sci-Fi">Sci-Fi</option>
        <option value="RPG">RPG</option>
        <option value="Sports">Sports</option>
        </select>`;
    }
}

categoryText();
window.addEventListener('resize', categoryText);

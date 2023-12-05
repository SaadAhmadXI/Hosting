const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach(item => {
    const header = item.querySelector('.accordion-header');

    function updateHeaderText() {
        const windowWidth = window.innerWidth || document.documentElement.clientWidth;
        if (windowWidth > 1340) {
            document.getElementById("hm").innerHTML = '<a href="https://onelinkgames.site/Private%20Policy/" class="hbutton">&#9830;Private Policy</a>';
        }
        else {
            if (windowWidth < 1340) {
                document.getElementById("hm").innerHTML = '<a href="https://onelinkgames.site/Community/" class="hbutton">&#9830;Request&nbsp;A Game</a><br><a href="https://onelinkgames.site/Private%20Policy/" class="hbutton">&#9830;Private Policy</a>';
            }
            else {
                document.getElementById("hm").innerHTML = '<a href="https://onelinkgames.site/Private%20Policy/" class="hbutton">&#9830;Private Policy</a>';
            }
            if (windowWidth < 1000) {
                document.getElementById("hm").innerHTML = '<a href="https://onelinkgames.site/contactus/" class="hbutton">&#9830;Contact&nbsp;Us</a><br><a href="https://onelinkgames.site/Community/" class="hbutton">&#9830;Request&nbsp;A&nbsp;Game</a><br><a href="https://onelinkgames.site/Private%20Policy/" class="hbutton">&#9830;Private Policy</a>';
            }
            else {
                document.getElementById("hm").innerHTML = '<a href="https://onelinkgames.site/Community/" class="hbutton">&#9830;Request&nbsp;A Game</a><br><a href="https://onelinkgames.site/Private%20Policy/" class="hbutton">&#9830;Private Policy</a>';
            }
            if (windowWidth < 790) {
                header.innerHTML = '&#9776;';
            } else {
                header.textContent = 'About Us';
            }
            if (windowWidth < 400) {
                document.getElementById("hm").innerHTML = '<a href="https://onelinkgames.site/Home/" class="hbutton">&#9830;Home</a><br><a href="https://onelinkgames.site/contactus/" class="hbutton">&#9830;Contact&nbsp;Us</a><br><a href="https://onelinkgames.site/Community/" class="hbutton">&#9830;Request&nbsp;A Game</a><br><a href="https://onelinkgames.site/Private%20Policy/" class="hbutton">&#9830;Private Policy</a>';
            }
            else {
                document.getElementById("hm").innerHTML = '<a href="https://onelinkgames.site/contactus/" class="hbutton">&#9830;Contact&nbsp;Us</a><br><a href="https://onelinkgames.site/Community/" class="hbutton">&#9830;Request&nbsp;A Game</a><br><a href="https://onelinkgames.site/Private%20Policy/" class="hbutton">&#9830;Private Policy</a>';
            }
        }
    }

    // Initial update on page load
    updateHeaderText();

    // Update on window resize
    window.addEventListener('resize', updateHeaderText);

    header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');

        accordionItems.forEach(item => {
            item.classList.remove('active');
        });

        if (!isActive) {
            item.classList.add('active');
        }
    });
});


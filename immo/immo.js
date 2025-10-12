
let slideIndex = 1;

// 2. Functie om de HTML van de slideshow te genereren
function genereerSlideshow() {
    const container = document.getElementById('slideshow-container');
    const dotContainer = document.getElementById('dot-container');
    
    let slidesHTML = '';
    let dotsHTML = '';

    fotoLijst.forEach((foto, index) => {
        const slideNum = index + 1;
        // HTML voor elke slide
        slidesHTML += `
            <div class="mySlides fade">
                <div class="numbertext">${slideNum} / ${fotoLijst.length}</div>
                <img src="${foto.src}" alt="${foto.caption}">
                <div class="text">${foto.caption}</div>
            </div>
        `;
        // HTML voor elke dot
        dotsHTML += `<span class="dot" onclick="currentSlide(${slideNum})"></span>`;
    });

    // Voeg navigatieknoppen toe aan de slides-HTML
    slidesHTML += `
        <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
        <a class="next" onclick="plusSlides(1)">&#10095;</a>
    `;

    container.innerHTML = slidesHTML;
    dotContainer.innerHTML = dotsHTML;
    
    // Start de slideshow
    showSlides(slideIndex);
    
    // 3. Touch/Swipe functionaliteit toevoegen
    voegSwipeToe();
}

// 4. Standaard Slideshow Logica
function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    
    if (slides.length === 0) return; // Stop als er geen slides zijn

    if (n > slides.length) {slideIndex = 1}
    if (n < 1) {slideIndex = slides.length}
    
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    
    slides[slideIndex-1].style.display = "block";
    dots[slideIndex-1].className += " active";
}

// 5. Swipe (Mobile) Functionaliteit
function voegSwipeToe() {
    const element = document.getElementById('slideshow-container');
    let touchstartX = 0;
    let touchendX = 0;

    element.addEventListener('touchstart', e => {
        touchstartX = e.changedTouches[0].screenX;
    }, false);

    element.addEventListener('touchend', e => {
        touchendX = e.changedTouches[0].screenX;
        handleGesprek();
    }, false);

    function handleGesprek() {
        // Swipe naar links (volgende slide)
        if (touchendX < touchstartX - 50) {
            plusSlides(1);
        }
        // Swipe naar rechts (vorige slide)
        if (touchendX > touchstartX + 50) {
            plusSlides(-1);
        }
    }
}


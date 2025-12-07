document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.portfolio__slider');
    const track = document.querySelector('.portfolio__track');
    const slides = Array.from(document.querySelectorAll('.portfolio__slide'));
    const prevBtn = document.querySelector('.portfolio__arrow--prev');
    const nextBtn = document.querySelector('.portfolio__arrow--next');
    const dotsContainer = document.querySelector('.portfolio__dots');

    if (!slider || !track || slides.length === 0) return;

    let currentIndex = 0;
    const lastIndex = slides.length - 1;

    slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'portfolio__dot';
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.querySelectorAll('.portfolio__dot'));

    function updateSlider() {
        const offset = -currentIndex * 100;
        track.style.transform = `translateX(${offset}%)`;

        slides.forEach((slide, index) => {
            slide.classList.toggle('portfolio__slide--active', index === currentIndex);
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle('portfolio__dot--active', index === currentIndex);
        });
    }

    function goToSlide(i) {
        currentIndex = i < 0 ? lastIndex : i > lastIndex ? 0 : i;
        updateSlider();
    }

    prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

    let startX = 0;
    let dragging = false;

    slider.addEventListener('touchstart', e => {
        if (!e.touches[0]) return;
        startX = e.touches[0].clientX;
        dragging = true;
    });

    slider.addEventListener('touchend', e => {
        if (!dragging) return;
        dragging = false;

        const endX = e.changedTouches[0].clientX;
        const delta = endX - startX;

        if (delta > 50) goToSlide(currentIndex - 1);
        if (delta < -50) goToSlide(currentIndex + 1);
    });

    updateSlider();
});

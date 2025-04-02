class Carousel {
    constructor() {
        this.track = document.querySelector('.carousel-track');
        this.slides = Array.from(this.track.children);
        this.nextButton = document.querySelector('.carousel-button.next');
        this.prevButton = document.querySelector('.carousel-button.prev');
        this.nav = document.querySelector('.carousel-nav');
        this.indicators = Array.from(this.nav.children);
        
        this.slideWidth = this.slides[0].getBoundingClientRect().width;
        this.currentSlide = 0;
        
        // Position initiale des slides
        this.slides.forEach((slide, index) => {
            slide.style.left = this.slideWidth * index + 'px';
        });
        
        // Event listeners
        this.nextButton.addEventListener('click', () => this.moveToSlide('next'));
        this.prevButton.addEventListener('click', () => this.moveToSlide('prev'));
        this.nav.addEventListener('click', e => {
            if (e.target.classList.contains('carousel-indicator')) {
                const targetIndex = this.indicators.indexOf(e.target);
                this.moveToSlide(targetIndex);
            }
        });

        // Click sur les images
        this.slides.forEach(slide => {
            slide.addEventListener('click', () => {
                // À l'avenir, ajoutez ici la logique pour gérer le clic sur l'image
                console.log('Image cliquée:', slide.querySelector('img').alt);
            });
        });

        // Défilement automatique
        this.startAutoSlide();
    }

    moveToSlide(target) {
        const currentSlide = this.slides[this.currentSlide];
        let nextSlideIndex;

        if (target === 'next') {
            nextSlideIndex = this.currentSlide === this.slides.length - 1 ? 0 : this.currentSlide + 1;
        } else if (target === 'prev') {
            nextSlideIndex = this.currentSlide === 0 ? this.slides.length - 1 : this.currentSlide - 1;
        } else {
            nextSlideIndex = target;
        }

        const nextSlide = this.slides[nextSlideIndex];
        this.track.style.transform = `translateX(-${nextSlide.style.left})`;
        
        // Mise à jour des indicateurs
        this.indicators[this.currentSlide].classList.remove('active');
        this.indicators[nextSlideIndex].classList.add('active');
        
        this.currentSlide = nextSlideIndex;
    }

    startAutoSlide() {
        setInterval(() => {
            this.moveToSlide('next');
        }, 5000); // Change de slide toutes les 5 secondes
    }
}

// Initialisation du carrousel
document.addEventListener('DOMContentLoaded', () => {
    new Carousel();
});
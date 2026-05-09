let lastScrollTop = 0;
let scrollDirection = 'down';
const header = document.querySelector('.header');
const scrollThreshold = 50;

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    
    // Determinar dirección del scroll
    if (currentScroll > lastScrollTop) {
        scrollDirection = 'down';
    } else {
        scrollDirection = 'up';
    }
    
    // Scroll hacia arriba: mostrar de golpe
    if (scrollDirection === 'up') {
        header.style.opacity = 1;
        header.style.pointerEvents = 'auto';
    }
    // Scroll hacia abajo: ocultar gradualmente
    else if (currentScroll > scrollThreshold) {
        const scrollDistance = currentScroll - scrollThreshold;
        const maxScrollDistance = 200;
        const opacity = Math.max(0, 1 - (scrollDistance / maxScrollDistance));
        header.style.opacity = opacity;
        
        // Deshabilitar enlaces cuando está oculto
        if (opacity <= 0) {
            header.style.pointerEvents = 'none';
        } else {
            header.style.pointerEvents = 'auto';
        }
    } else {
        // Si está cerca del top, mostrar completamente
        header.style.opacity = 1;
        header.style.pointerEvents = 'auto';
    }
    
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
});

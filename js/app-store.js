
window.addEventListener("scroll", function(){
    const gradiantBienvenida = document.querySelector('.gradiantBienvenida');
    const header = document.querySelector('.header');
    
    gradiantBienvenida.classList.toggle("gradiantBienvenida-active", window.scrollY > 150);
    header.classList.toggle("header-active", window.scrollY > 100);
})

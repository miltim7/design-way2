// components/header/header.js

document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('.header');
    const burger = document.querySelector('.header__burger');
    const mobileMenu = document.querySelector('.header__mobile-menu');
    const mobileLinks = document.querySelectorAll('.header__mobile-link');
    const mobileCTA = document.querySelector('.header__mobile-cta');
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    if (burger && mobileMenu) {
        burger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Burger clicked!');
            
            burger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            
            if (burger.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
                console.log('Menu opened');
            } else {
                document.body.style.overflow = '';
                console.log('Menu closed');
            }
        });
        
        if (mobileLinks.length > 0) {
            mobileLinks.forEach(function(link) {
                link.addEventListener('click', function() {
                    burger.classList.remove('active');
                    mobileMenu.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
        }
        
        if (mobileCTA) {
            mobileCTA.addEventListener('click', function() {
                burger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        }
    }
    
    const sections = document.querySelectorAll('section[id]');
    const menuLinks = document.querySelectorAll('.header__menu-link');
    
    if (sections.length > 0 && menuLinks.length > 0) {
        window.addEventListener('scroll', function() {
            let current = '';
            
            sections.forEach(function(section) {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            menuLinks.forEach(function(link) {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
    }
});
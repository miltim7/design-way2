// components/header/header.js

(function () {
    function getHeader() {
        return document.querySelector('.header');
    }

    function getBurger() {
        return document.querySelector('.header__burger');
    }

    function getMobileMenu() {
        return document.querySelector('.header__mobile-menu');
    }

    function closeMenu() {
        const burger = getBurger();
        const mobileMenu = getMobileMenu();

        if (!burger || !mobileMenu) return;

        burger.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    function openMenu() {
        const burger = getBurger();
        const mobileMenu = getMobileMenu();

        if (!burger || !mobileMenu) return;

        burger.classList.add('active');
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function toggleMenu() {
        const burger = getBurger();
        if (!burger) return;

        if (burger.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    document.addEventListener('click', function (e) {
        const burgerClick = e.target.closest('.header__burger');
        const mobileLinkClick = e.target.closest('.header__mobile-link');
        const mobileCtaClick = e.target.closest('.header__mobile-cta');

        if (burgerClick) {
            e.preventDefault();
            toggleMenu();
            return;
        }

        if (mobileLinkClick || mobileCtaClick) {
            closeMenu();
        }
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth >= 1024) {
            closeMenu();
        }
    });

    window.addEventListener('scroll', function () {
        const header = getHeader();

        if (header) {
            const currentScroll = window.pageYOffset;
            if (currentScroll > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        const sections = document.querySelectorAll('section[id]');
        const menuLinks = document.querySelectorAll('.header__menu-link');

        if (!sections.length || !menuLinks.length) return;

        let current = '';

        sections.forEach(function (section) {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        menuLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
})();

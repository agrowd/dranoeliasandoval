/* ═══════════════════════════════════════════════════════
   DRA. NOELIA SANDOVAL — MEDICINA ESTÉTICA & LÁSER
   Interactions & Animations
   ═══════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
    // ─── DOM Elements ───
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const floatingCta = document.getElementById('floatingCta');
    const allNavAnchors = document.querySelectorAll('.nav-links a');
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    // ─── Navbar Scroll Effect ───
    let lastScroll = 0;
    const SCROLL_THRESHOLD = 80;

    function handleNavbarScroll() {
        const currentScroll = window.scrollY;

        if (currentScroll > SCROLL_THRESHOLD) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }

    // ─── Floating CTA Visibility ───
    function handleFloatingCta() {
        if (window.scrollY > window.innerHeight * 0.6) {
            floatingCta.classList.add('visible');
        } else {
            floatingCta.classList.remove('visible');
        }
    }

    // ─── Scroll Event (throttled) ───
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleNavbarScroll();
                handleFloatingCta();
                ticking = false;
            });
            ticking = true;
        }
    });

    // ─── Intersection Observer for Scroll Animations ───
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => scrollObserver.observe(el));

    // ─── Mobile Menu Toggle ───
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    allNavAnchors.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ─── Smooth Scroll for Anchor Links ───
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetEl = document.querySelector(targetId);

            if (targetEl) {
                const navHeight = navbar.offsetHeight;
                const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ─── Active Nav Link on Scroll ───
    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        const scrollPos = window.scrollY + 200;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                allNavAnchors.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveNav();
            });
        }
    });

    // ─── Subtle Parallax on Hero ───
    const heroBgImg = document.querySelector('.hero-bg-img');

    if (heroBgImg) {
        window.addEventListener('scroll', () => {
            if (window.scrollY < window.innerHeight) {
                const offset = window.scrollY * 0.3;
                heroBgImg.style.transform = `scale(1.05) translateY(${offset}px)`;
            }
        });
    }

    // ─── Initial state: force hero elements visible after short delay ───
    setTimeout(() => {
        document.querySelectorAll('.hero .animate-on-scroll').forEach((el, i) => {
            setTimeout(() => {
                el.classList.add('is-visible');
            }, i * 200);
        });
    }, 300);

    // ─── Trigger initial scroll handlers ───
    handleNavbarScroll();
    handleFloatingCta();

    // ─── Doctor Photo Carousel ───
    const track = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    const dots = document.querySelectorAll('.carousel-dot');
    const totalSlides = dots.length;
    let currentIndex = 0;
    let autoplayTimer = null;

    function goToSlide(index) {
        currentIndex = (index + totalSlides) % totalSlides;
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
    }

    function startAutoplay() {
        autoplayTimer = setInterval(() => goToSlide(currentIndex + 1), 4000);
    }

    function stopAutoplay() {
        clearInterval(autoplayTimer);
    }

    if (track && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => { goToSlide(currentIndex - 1); stopAutoplay(); startAutoplay(); });
        nextBtn.addEventListener('click', () => { goToSlide(currentIndex + 1); stopAutoplay(); startAutoplay(); });
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                goToSlide(parseInt(dot.dataset.index));
                stopAutoplay();
                startAutoplay();
            });
        });
        track.parentElement.addEventListener('mouseenter', stopAutoplay);
        track.parentElement.addEventListener('mouseleave', startAutoplay);
        startAutoplay();
    }

    // ─── Generic Card Carousels ───
    const cardCarousels = document.querySelectorAll('.card-carousel');

    cardCarousels.forEach(carousel => {
        const track = carousel.querySelector('.card-carousel-track');
        const prevBtn = carousel.querySelector('.card-carousel-prev');
        const nextBtn = carousel.querySelector('.card-carousel-next');
        const dots = carousel.querySelectorAll('.card-carousel-dot');
        const slidesCount = dots.length;
        if (!track || slidesCount === 0) return;

        let currentIndex = 0;
        let autoplayTimer = null;

        const updateCarousel = (index) => {
            currentIndex = (index + slidesCount) % slidesCount;
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
        };

        const startAuto = () => {
            // Randomize slightly so they don't all slide exactly at the same millisecond
            autoplayTimer = setInterval(() => updateCarousel(currentIndex + 1), 3500 + Math.random() * 1000);
        };

        const stopAuto = () => {
            clearInterval(autoplayTimer);
        };

        if (prevBtn) prevBtn.addEventListener('click', () => { updateCarousel(currentIndex - 1); stopAuto(); startAuto(); });
        if (nextBtn) nextBtn.addEventListener('click', () => { updateCarousel(currentIndex + 1); stopAuto(); startAuto(); });

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                updateCarousel(parseInt(dot.dataset.index));
                stopAuto();
                startAuto();
            });
        });

        carousel.addEventListener('mouseenter', stopAuto);
        carousel.addEventListener('mouseleave', startAuto);

        startAuto();
    });
});

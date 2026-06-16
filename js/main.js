document.addEventListener('DOMContentLoaded', () => {

    // ── Scroll Progress ──
    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        window.addEventListener('scroll', () => {
            const h = document.documentElement;
            const pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight);
            progressBar.style.transform = `scaleX(${pct})`;
        }, { passive: true });
    }

    // ── Mobile Drawer ──
    const burger = document.querySelector('.nav-mobile-btn');
    const drawer = document.querySelector('.nav-drawer');

    if (burger && drawer) {
        burger.addEventListener('click', () => {
            burger.classList.toggle('active');
            drawer.classList.toggle('active');
            burger.setAttribute('aria-expanded', drawer.classList.contains('active'));
            document.body.style.overflow = drawer.classList.contains('active') ? 'hidden' : '';
        });

        drawer.querySelectorAll('a').forEach(a => {
            a.addEventListener('click', () => {
                burger.classList.remove('active');
                drawer.classList.remove('active');
                burger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    // ── Accordion ──
    document.querySelectorAll('.acc-head').forEach(head => {
        head.addEventListener('click', () => {
            const item = head.closest('.acc-item');
            const isOpen = item.classList.contains('open');

            item.closest('.acc, .acc-split, .section')
                ?.querySelectorAll('.acc-item.open')
                .forEach(el => { if (el !== item) el.classList.remove('open'); });

            item.classList.toggle('open', !isOpen);
        });
    });

    // ── Scroll Reveal ──
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('[data-reveal], [data-stagger]').forEach(el => {
        revealObserver.observe(el);
    });

    // ── Active Nav Link ──
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .nav-drawer a').forEach(a => {
        const href = a.getAttribute('href');
        if (!href) return;
        const linkPage = href.split('/').pop().split('#')[0];
        if (linkPage === page || (page === '' && linkPage === 'index.html')) {
            a.classList.add('active');
        }
    });

    // ── Smooth scroll for anchor links ──
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

});

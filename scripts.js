document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for same-page anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = this.getAttribute('href');
            if (!target || target === '#') return;
            if (target.startsWith('#') && document.querySelector(target)) {
                e.preventDefault();
                document.querySelector(target).scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Skills animation: read data-progress attribute from .skill-progress
    const observerOptions = { threshold: 0.4 };
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.skill-progress').forEach(bar => {
                    const progress = bar.getAttribute('data-progress') || '0%';
                    bar.style.width = progress;
                });
            }
        });
    }, observerOptions);

    document.querySelectorAll('.skill-category').forEach(category => skillObserver.observe(category));

    // Form submission (defensive: only add listener if form exists)
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Simple validation example (more can be added)
            const name = form.querySelector('[name="name"]');
            const email = form.querySelector('[name="email"]');
            const message = form.querySelector('[name="message"]');
            if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
                alert('Por favor, preencha todos os campos.');
                return;
            }
            // Placeholder action: show success and reset
            alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
            form.reset();
        });
    }
});

// Fade-in animation on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach(el => observer.observe(el));

    // Form submission simulation
    const form = document.getElementById('booking-form');
    const successMsg = document.getElementById('form-success');

    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Simple visual loading state
            const btn = document.querySelector('.btn-submit');
            const originalText = btn.innerHTML;
            btn.innerHTML = 'Sending... ⏳';
            btn.style.opacity = '0.8';
            btn.disabled = true;

            // Send data to Formspree
            const formData = new FormData(form);
            fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            }).then(response => {
                if (response.ok) {
                    form.style.display = 'none';
                    successMsg.style.display = 'block';
                    form.reset();
                } else {
                    btn.innerHTML = originalText;
                    btn.style.opacity = '1';
                    btn.disabled = false;
                    alert("Oops! There was a problem submitting your form");
                }
            }).catch(error => {
                btn.innerHTML = originalText;
                btn.style.opacity = '1';
                btn.disabled = false;
                alert("Oops! There was a problem submitting your form");
            });
        });
    }
});

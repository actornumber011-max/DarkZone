// Typewriter Effect
const textArray = ["Student.", "Developer.", "Tech Enthusiast."];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

const typedTextSpan = document.getElementById("typewriter");

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if (textArrayIndex >= textArray.length) textArrayIndex = 0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function () {
    // Start Typing Effect
    if (textArray.length) setTimeout(type, newTextDelay + 250);

    // Scroll Reveal Animation
    const reveals = document.querySelectorAll(".reveal");

    // Number Counter Animation
    const counters = document.querySelectorAll('.counter');
    let hasAnimatedCounters = false;

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const speed = 200;

                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach((reveal) => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add("active");

                if (reveal.classList.contains('stat-item') && !hasAnimatedCounters) {
                    animateCounters();
                    hasAnimatedCounters = true;
                }
            }
        });
    };

    const bgLion = document.getElementById('bg-lion');

    window.addEventListener("scroll", () => {
        revealOnScroll();

        // Parallax Lion Effect
        if (bgLion) {
            const scrollY = window.scrollY;
            bgLion.style.transform = `translate(-50%, calc(-50% + ${scrollY * 0.3}px))`;
        }
    });
    revealOnScroll(); // Trigger once on load
});

// AJAX form submission using FormSubmit.co
document.getElementById('contact-form')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const form = e.target;
    const btn = form.querySelector('button');
    const originalText = btn.textContent;

    btn.textContent = 'Sending...';
    btn.style.opacity = '0.8';

    const formData = new FormData(form);

    fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            btn.textContent = 'Message Sent!';
            btn.style.background = 'linear-gradient(135deg, #10b981, #34d399)';
            form.reset();

            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.background = '';
                btn.style.opacity = '1';
            }, 3000);
        } else {
            btn.textContent = 'Error sending';
            setTimeout(() => {
                btn.textContent = originalText;
                btn.style.opacity = '1';
            }, 3000);
        }
    }).catch(error => {
        btn.textContent = 'Network Error';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.opacity = '1';
        }, 3000);
    });
});
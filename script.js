// script.js - Professional Portfolio with Email Notifications
// ✅ Your credentials are already configured!
// Emails will be sent to: deepaksenthil681@gmail.com

// Initialize EmailJS with YOUR Public Key
(function() {
    emailjs.init("C55nP6HqXpsJOaYE-");
})();

// Mobile Menu Toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Active navigation highlight on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1);
        if (href === current) {
            link.classList.add('active');
        }
    });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// CONTACT FORM - Sends email to deepaksenthil681@gmail.com
// ============================================
const contactForm = document.getElementById('contactForm');
const formFeedback = document.getElementById('formFeedback');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const nameInput = contactForm.querySelector('input[placeholder="Your Name"]');
        const emailInput = contactForm.querySelector('input[placeholder="Email Address"]');
        const messageInput = contactForm.querySelector('textarea');
        
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

        // Validation
        if (!name || !email || !message) {
            showFeedback('❌ Please fill in all fields.', 'error');
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            showFeedback('❌ Please enter a valid email address.', 'error');
            return;
        }

        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        try {
            // Template parameters matching your EmailJS setup
            const templateParams = {
                from_name: name,
                from_email: email,
                reply_to: email,
                sender_email: email,
                message: message,
                title: "Portfolio Contact",
                to_email: "deepaksenthil681@gmail.com"
            };

            // YOUR credentials already inserted here!
            const result = await emailjs.send(
                'service_pzpvrwa',    // Your Service ID
                'template_dgpknvu',   // Your Template ID
                templateParams
            );

            if (result.status === 200) {
                showFeedback('✅ Message sent successfully! I will reply within 24 hours.', 'success');
                contactForm.reset();
                console.log('✅ Email sent to deepaksenthil681@gmail.com');
            } else {
                throw new Error('Failed to send');
            }
            
        } catch (error) {
            console.error('Email error:', error);
            showFeedback('❌ Failed to send. Please email me directly at deepaksenthil681@gmail.com', 'error');
        } finally {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            
            setTimeout(() => {
                if (formFeedback) formFeedback.textContent = '';
            }, 5000);
        }
    });
}

function showFeedback(message, type) {
    if (formFeedback) {
        formFeedback.textContent = message;
        formFeedback.style.color = type === 'success' ? '#16a34a' : '#dc2626';
    }
}

// Dynamic year update
const footerYear = document.querySelector('footer p');
if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.innerHTML = footerYear.innerHTML.replace('2026', currentYear);
}

// Profile image fallback
const profileImg = document.getElementById('profilePhoto');
if (profileImg && profileImg.complete && profileImg.naturalWidth === 0) {
    profileImg.src = 'https://via.placeholder.com/400x500?text=Upload+Your+Photo';
}

console.log('✅ Portfolio ready | Contact form sends to deepaksenthil681@gmail.com');
document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    const currentYearSpan = document.getElementById('current-year');

    // Set current year in footer
    currentYearSpan.textContent = new Date().getFullYear();

    // Function to update active nav link
    const updateActiveNavLink = () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const viewportHeight = window.innerHeight;
            
            // Consider a section active if its top is within the middle half of the viewport
            if (window.scrollY + viewportHeight * 0.25 >= sectionTop && window.scrollY < sectionTop + sectionHeight - viewportHeight * 0.25) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active'); // Always remove active first
            // Check if the link's href matches the current section's ID
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active'); // Then add if it matches current section
            }
        });
    };

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNavLink(); // Call this on scroll
    });

    // Call on page load to set initial active link
    updateActiveNavLink();

    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                // Immediately add active class to the clicked link
                navLinks.forEach(l => l.classList.remove('active')); // Remove from all others
                this.classList.add('active'); // Add to clicked

                window.scrollTo({
                    top: targetSection.offsetTop - navbar.clientHeight, // Adjust for fixed navbar height
                    behavior: 'smooth'
                });

                // Ensure active state is correctly managed after smooth scroll
                // This timeout is a fallback; the scroll listener should update it too
                setTimeout(updateActiveNavLink, 700); 
            }
        });
    });
});
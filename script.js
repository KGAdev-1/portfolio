        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Header background change on scroll
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.header');
            if (window.scrollY > 100) {
                header.style.background = 'rgba(245, 241, 235, 0.98)';
                header.style.backdropFilter = 'blur(25px)';
            } else {
                header.style.background = 'rgba(245, 241, 235, 0.95)';
                header.style.backdropFilter = 'blur(20px)';
            }
        });

        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                    }, index * 100);
                }
            });
        }, observerOptions);

        // Observe elements for animations
        document.querySelectorAll('.project-card, .experience-item, .skill-category').forEach((element) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(30px)';
            element.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
            observer.observe(element);
        });

        // Parallax effect for hero section
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            const heroContent = document.querySelector('.hero-content');
            
            if (hero && scrolled < hero.offsetHeight) {
                heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });

        // Add hover effects to project cards
        document.querySelectorAll('.project-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-15px) scale(1.02)';
                this.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.2)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
                this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
            });
        });

        // Typing effect for hero title
        function typeWriter(element, text, speed = 150) {
            let i = 0;
            element.innerHTML = '';
            function typing() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(typing, speed);
                }
            }
            typing();
        }

        // Initialize typing effect after page loads
        window.addEventListener('load', () => {
            setTimeout(() => {
                const heroTitle = document.querySelector('.portfolio-title');
                typeWriter(heroTitle, 'PORTFOLIO', 200);
            }, 800);
        });

        // Active navigation highlighting
        window.addEventListener('scroll', () => {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('.nav-links a');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.getBoundingClientRect().top;
                if (sectionTop <= 100) {
                    current = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });

        // Mobile menu toggle (for future responsive enhancement)
        const mobileMenuToggle = () => {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('mobile-active');
        };

        // Add some interactive elements on scroll
        let ticking = false;
        function updateOnScroll() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = scrollTop / docHeight;
            
            // Update floating elements position
            document.querySelectorAll('.floating-star').forEach((star, index) => {
                const speed = (index + 1) * 0.5;
                star.style.transform = `translateY(${scrollTop * speed}px) rotate(${scrollPercent * 360}deg)`;
            });
            
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateOnScroll);
                ticking = true;
            }
        });

        const themeToggle = document.getElementById('theme-toggle');
        const body = document.body;
        const themeIcon = document.getElementById('theme-icon');

        // Check for saved theme preference on page load
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            body.classList.add('dark-theme');
            themeIcon.textContent = '☀️';
        } else {
            themeIcon.textContent = '🌑';
        }

        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            if (body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
                themeIcon.textContent = '☀️'; // Change to sun icon
            } else {
                localStorage.setItem('theme', 'light');
                themeIcon.textContent = '🌑'; // Change to moon icon
            }
        });

                document.addEventListener('DOMContentLoaded', () => {
            // Select all elements with the class 'open-modal-btn'
            const openModalBtns = document.querySelectorAll('.open-modal-btn');
            const modal = document.getElementById('modal');
            const modalCloseBtn = document.getElementById('modal-close');
            
            // Function to open the modal
            const openModal = () => {
                modal.style.display = 'flex';
            };
            
            // Function to close the modal
            const closeModal = () => {
                modal.style.display = 'none';
            };
            
            // Loop through all the buttons and add a click event listener to each one
            openModalBtns.forEach(btn => {
                btn.addEventListener('click', (event) => {
                    event.preventDefault(); // Prevents the link from navigating away
                    openModal();
                });
            });
            
            // Event listener for the close button
            modalCloseBtn.addEventListener('click', closeModal);
            
            // Event listener to close the modal when clicking outside the content
            modal.addEventListener('click', (event) => {
                if (event.target === modal) {
                    closeModal();
                }
            });
            
            // Close with the Escape key
            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape' && modal.style.display === 'flex') {
                    closeModal();
                }
            });
        });
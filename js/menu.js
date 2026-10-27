document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. SMOOTH SCROLL & ACTIVE STATE FOR FILTERS
    // ==========================================
    const filterBtns = document.querySelectorAll('.filter-btn');
    const categories = document.querySelectorAll('.menu-category');
    const filterBar = document.getElementById('filter-bar');

    // Click to scroll
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');

            const targetId = btn.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const headerOffset = 140; 
                const elementPosition = targetSection.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // ScrollSpy: Update active button on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;

        categories.forEach(category => {
            const categoryTop = category.offsetTop - 200; // Offset to account for sticky bar
            const categoryHeight = category.offsetHeight;
            
            if (scrollY >= categoryTop && scrollY < categoryTop + categoryHeight) {
                current = category.getAttribute('id');
            }
        });

        // Force active on last section if scrolled to bottom
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 50) {
            current = categories[categories.length - 1].getAttribute('id');
        }

        if (current) {
            filterBtns.forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-target') === current) {
                    btn.classList.add('active');
                }
            });
        }
    });

    // ==========================================
    // 2. NAVBAR SCROLL EFFECT (Menu page specific)
    // ==========================================
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) { 
            navbar.classList.add("scrolled"); 
            if(filterBar) filterBar.classList.add("scrolled");
        } else { 
            navbar.classList.remove("scrolled"); 
            if(filterBar) filterBar.classList.remove("scrolled");
        }
    });

    // Mobile menu toggle
    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");
    if(hamburger) {
        hamburger.addEventListener("click", () => {
            if (navLinks.style.display === "flex") { navLinks.style.display = "none"; } 
            else { 
                navLinks.style.display = "flex"; 
                navLinks.style.flexDirection = "column"; 
                navLinks.style.position = "absolute"; 
                navLinks.style.top = "100%"; 
                navLinks.style.left = "0"; 
                navLinks.style.width = "100%"; 
                navLinks.style.background = "rgba(10, 10, 10, 0.95)"; 
                navLinks.style.padding = "20px"; 
                navLinks.style.textAlign = "center"; 
            }
        });
    }
});
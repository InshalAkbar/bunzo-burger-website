document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. NAVBAR SCROLL EFFECT & MOBILE MENU
    // ==========================================
    const navbar = document.getElementById("navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) { navbar.classList.add("scrolled"); } else { navbar.classList.remove("scrolled"); }
    });

    const hamburger = document.getElementById("hamburger");
    const navLinks = document.getElementById("navLinks");
    if(hamburger) {
        hamburger.addEventListener("click", () => {
            if (navLinks.style.display === "flex") { navLinks.style.display = "none"; } 
            else { navLinks.style.display = "flex"; navLinks.style.flexDirection = "column"; navLinks.style.position = "absolute"; navLinks.style.top = "100%"; navLinks.style.left = "0"; navLinks.style.width = "100%"; navLinks.style.background = "rgba(10, 10, 10, 0.95)"; navLinks.style.padding = "20px"; navLinks.style.textAlign = "center"; }
        });
    }

    // ==========================================
    // 2. TOAST MESSAGE LOGIC
    // ==========================================
    window.showToast = function(message) {
        let toast = document.getElementById("toast");
        if (!toast) {
            toast = document.createElement("div");
            toast.id = "toast";
            toast.className = "toast-message";
            // Basic inline styles for toast to ensure it works even if CSS fails
            toast.style.cssText = "position:fixed; bottom:-100px; left:50%; transform:translateX(-50%); background:#F28C38; color:#000; padding:15px 30px; border-radius:50px; font-weight:700; z-index:9999; transition:bottom 0.4s ease; display:flex; align-items:center; gap:10px; box-shadow:0 10px 30px rgba(0,0,0,0.5);";
            document.body.appendChild(toast);
        }
        toast.innerHTML = `<i class="fa-solid fa-check-circle"></i> ${message}`;
        
        setTimeout(() => { toast.style.bottom = "30px"; }, 10);
        setTimeout(() => { toast.style.bottom = "-100px"; }, 3500);
    }

    // ==========================================
    // 3. NEWSLETTER FORM LOGIC (FIXED)
    // ==========================================
    const newsletterForms = document.querySelectorAll(".newsletter-form");
    if (newsletterForms.length > 0) {
        newsletterForms.forEach(form => {
            form.addEventListener("submit", (e) => {
                e.preventDefault(); // Prevents page reload
                
                const input = form.querySelector('input[type="email"]');
                if (input && input.value.trim() !== "") {
                    // Show thank you message
                    showToast("Thank you for subscribing! Please login/register to continue.");
                    
                    // Clear input
                    input.value = "";
                    
                    // Redirect to login page after 1.5 seconds
                    const isSubPage = window.location.pathname.includes('/pages/');
                    setTimeout(() => {
                        window.location.href = isSubPage ? "login.html" : "pages/login.html";
                    }, 1500);
                } else {
                    showToast("Please enter a valid email address.");
                }
            });
        });
    }

    // ==========================================
    // 4. AUTH LOGIC (LOGIN/LOGOUT STATE)
    // ==========================================
    const authButtons = document.getElementById("auth-buttons");
    const userInfo = document.getElementById("user-info");
    const userNameDisplay = document.getElementById("user-name-display");
    const logoutBtn = document.getElementById("nav-logout-btn");

    function checkAuth() {
        const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
        const user = JSON.parse(localStorage.getItem("bunzoUser"));

        if (isLoggedIn && user) {
            if(authButtons) authButtons.style.display = "none";
            if(userInfo) userInfo.style.display = "flex";
            if(userNameDisplay) userNameDisplay.innerText = `Hi, ${user.name.split(' ')[0]}`;
        } else {
            if(authButtons) authButtons.style.display = "flex";
            if(userInfo) userInfo.style.display = "none";
        }
    }

    checkAuth();

    // Handle login success toast
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('login') === 'success' && window.showToast) {
        window.showToast("Welcome back to BUNZO!");
    }

    // Handle Logout
    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("isLoggedIn");
            window.location.reload(); 
        });
    }

    // ==========================================
    // 5. ORDER BUTTON TOAST
    // ==========================================
    document.addEventListener('click', function(e) {
        const orderBtn = e.target.closest('.trigger-order');
        if (orderBtn) {
            if (orderBtn.tagName === 'BUTTON' || (orderBtn.tagName === 'A' && orderBtn.getAttribute('href') === '#')) {
                e.preventDefault();
            }
            
            if(localStorage.getItem("isLoggedIn") === "true") {
                showToast("Thank you for your order! Your food is being prepared.");
            } else {
                showToast("Please login to place an order.");
                setTimeout(() => {
                    const isSubPage = window.location.pathname.includes('/pages/');
                    window.location.href = isSubPage ? 'login.html' : 'pages/login.html';
                }, 1500);
            }

            // Local animation for product page button
            if(orderBtn.id === "order-now-btn") {
                orderBtn.innerHTML = `Added! <i class="fa-solid fa-check"></i>`;
                orderBtn.style.background = "#4caf50";
                orderBtn.style.color = "#fff";
                orderBtn.style.borderColor = "#4caf50";
                
                setTimeout(() => {
                    orderBtn.innerHTML = `Order Now <i class="fa-solid fa-arrow-right"></i>`;
                    orderBtn.style.background = "var(--ember-orange)";
                    orderBtn.style.color = "var(--bg-black)";
                    orderBtn.style.borderColor = "var(--ember-orange)";
                }, 2000);
            }
        }
    });

    // ==========================================
    // 6. LIVE DATE, TIME & STATUS LOGIC
    // ==========================================
    const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    
    function updateLiveStatus() {
        const now = new Date();
        const dateString = `TODAY - ${daysOfWeek[now.getDay()]} ${String(now.getDate()).padStart(2, '0')} ${months[now.getMonth()]}`;
        const dateEl = document.getElementById("live-day-date");
        if(dateEl) dateEl.innerText = dateString;

        const receiptDateEl = document.getElementById("receipt-date");
        const receiptTimeEl = document.getElementById("receipt-time");
        if(receiptDateEl && receiptTimeEl) {
            receiptDateEl.innerText = `${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')}/${now.getFullYear()}`;
            let hours = now.getHours(); let minutes = String(now.getMinutes()).padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM'; hours = hours % 12; hours = hours ? hours : 12; 
            receiptTimeEl.innerText = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
        }

        const currentHour = now.getHours();
        const statusEl = document.getElementById("live-status");
        const statusDot = document.getElementById("status-dot");
        if (statusEl && statusDot) {
            if (currentHour >= 11 && currentHour < 22) { statusEl.innerText = "Open now"; statusDot.style.background = "#4caf50"; } 
            else { statusEl.innerText = "Closed for today"; statusDot.style.background = "#ff4444"; }
        }
    }
    updateLiveStatus();
    setInterval(updateLiveStatus, 60000); 

    // ==========================================
    // 7. WEEKLY SCHEDULE GENERATOR
    // ==========================================
    const scheduleData = [
        { day: "MON", loc: "Downtown Plaza", time: "11:00 - 21:00" }, { day: "TUE", loc: "Northgate Campus", time: "11:00 - 22:00" },
        { day: "WED", loc: "Pier 9 Market Lot", time: "11:30 - 21:30" }, { day: "THU", loc: "Canal Street Brewery", time: "17:00 - 22:00" },
        { day: "FRI", loc: "Linden Park Gates", time: "11:30 - 21:00" }, { day: "SAT", loc: "Harbour Night Market", time: "17:00 - 23:00" },
        { day: "SUN", loc: "Private events", time: "Weddings, Offices" }
    ];

    const scheduleContainer = document.getElementById("week-schedule");
    if (scheduleContainer) {
        const todayIndex = new Date().getDay(); 
        const jsDayToArrayIndex = { 1: 0, 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 0: 6 };
        const currentActiveIndex = jsDayToArrayIndex[todayIndex];
        scheduleData.forEach((item, index) => {
            const isActive = index === currentActiveIndex ? "active" : "";
            const activeLabel = isActive ? `${item.day} - TODAY` : item.day;
            scheduleContainer.insertAdjacentHTML("beforeend", `<div class="schedule-day ${isActive}"><span class="day-name">${activeLabel}</span><span class="day-location">${item.loc}</span><span class="day-time">${item.time}</span></div>`);
        });
    }

    // ==========================================
    // 8. CANVAS ANIMATIONS (SMOKE & SPARKS)
    // ==========================================
    const smokeCanvas = document.getElementById("smoke-canvas");
    if(smokeCanvas) {
        const smokeCtx = smokeCanvas.getContext("2d");
        let width, height;

        function resizeCanvas() { width = smokeCanvas.width = window.innerWidth; height = smokeCanvas.height = window.innerHeight; }
        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        const smokeParticles = [];
        class SmokeParticle {
            constructor() { this.reset(); }
            reset() { this.x = width / 2 + (Math.random() - 0.5) * 150; this.y = height / 2; this.size = Math.random() * 60 + 40; this.speedY = -(Math.random() * 1.5 + 0.5); this.speedX = (Math.random() - 0.5) * 0.5; this.opacity = Math.random() * 0.15 + 0.05; this.life = 0; this.maxLife = Math.random() * 300 + 200; }
            update() { this.x += this.speedX; this.y += this.speedY; this.life++; this.size += 0.6; this.opacity -= 0.0005; this.speedX += (Math.random() - 0.5) * 0.05; if (this.life > this.maxLife || this.opacity <= 0) { this.reset(); } }
            draw(ctx) { const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size); gradient.addColorStop(0, `rgba(200, 200, 200, ${this.opacity})`); gradient.addColorStop(1, `rgba(200, 200, 200, 0)`); ctx.fillStyle = gradient; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); }
        }
        for (let i = 0; i < 20; i++) smokeParticles.push(new SmokeParticle());
        function animateSmoke() { smokeCtx.clearRect(0, 0, width, height); smokeParticles.forEach(p => { p.update(); p.draw(smokeCtx); }); requestAnimationFrame(animateSmoke); }
        animateSmoke();

        const sparksCanvas = document.getElementById("sparks-canvas");
        const sparksCtx = sparksCanvas.getContext("2d");
        sparksCanvas.width = width; sparksCanvas.height = height;
        const sparkParticles = [];
        class SparkParticle {
            constructor() { this.reset(); }
            reset() { this.x = width / 2 + (Math.random() - 0.5) * 250; this.y = height * 0.75; this.size = Math.random() * 2 + 1; this.speedY = -(Math.random() * 4 + 2); this.speedX = (Math.random() - 0.5) * 2; this.opacity = 1; this.life = 0; this.maxLife = Math.random() * 80 + 40; }
            update() { this.x += this.speedX; this.y += this.speedY; this.life++; this.opacity -= 0.02; this.speedY += 0.08; if (this.life > this.maxLife || this.opacity <= 0) { this.reset(); } }
            draw(ctx) { ctx.fillStyle = `rgba(242, 140, 56, ${this.opacity})`; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); ctx.shadowBlur = 10; ctx.shadowColor = "rgba(242, 140, 56, 1)"; }
        }
        for (let i = 0; i < 50; i++) { let p = new SparkParticle(); p.life = Math.random() * p.maxLife; sparkParticles.push(p); }
        function animateSparks() { sparksCtx.clearRect(0, 0, width, height); sparkParticles.forEach(p => { p.update(); p.draw(sparksCtx); }); requestAnimationFrame(animateSparks); }
        animateSparks();
        window.addEventListener("resize", () => { sparksCanvas.width = window.innerWidth; sparksCanvas.height = window.innerHeight; });
    }

    // ==========================================
    // 9. SCROLL REVEAL ANIMATION
    // ==========================================
    const revealElements = document.querySelectorAll('.reveal');
    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.85;
        revealElements.forEach(reveal => { if (reveal.getBoundingClientRect().top < triggerBottom) { reveal.classList.add('active'); } });
    }
    window.addEventListener('scroll', checkReveal);
    checkReveal();

    // ==========================================
    // 10. POLAROID CLICK / CAROUSEL EFFECT
    // ==========================================
    const polaroidStack = document.getElementById("polaroid-stack");
    if (polaroidStack) {
        polaroidStack.addEventListener("click", (e) => {
            const clickedPolaroid = e.target.closest(".polaroid");
            if (clickedPolaroid) {
                const p1 = document.querySelector(".polaroid.p1"); const p2 = document.querySelector(".polaroid.p2"); const p3 = document.querySelector(".polaroid.p3");
                if (p1 && p2 && p3) {
                    if (clickedPolaroid.classList.contains("p1")) { p1.classList.replace("p1", "p3"); p2.classList.replace("p2", "p1"); p3.classList.replace("p3", "p2"); } 
                    else if (clickedPolaroid.classList.contains("p2")) { p2.classList.replace("p2", "p1"); p1.classList.replace("p1", "p3"); p3.classList.replace("p3", "p2"); } 
                    else if (clickedPolaroid.classList.contains("p3")) { p3.classList.replace("p3", "p1"); p1.classList.replace("p1", "p2"); p2.classList.replace("p2", "p3"); }
                }
            }
        });
    }

    // ==========================================
    // 11. PRINTER ANIMATION & RECEIPT DATA
    // ==========================================
    const printReceipt = document.getElementById("print-receipt");
    const sharedSection = document.querySelector(".shared-section");
    const printAgainBtn = document.getElementById("print-again-btn");
    const itemsContainer = document.getElementById("receipt-items-container");
    const orderNoEl = document.getElementById("receipt-order-no");
    const totalValEl = document.getElementById("receipt-total-val");

    const receiptsData = [
        { orderNo: "01", total: "$14", items: [{ name: "1x DOUBLE SMASH", check: true }, { name: "1x BOLD FLAVORS", check: true }, { name: "1x PEOPLE YOU LOVE", check: true }, { name: "0x BORING FOOD", check: false }] },
        { orderNo: "02", total: "$28", items: [{ name: "2x CLASSIC SMASH", check: true }, { name: "1x LOADED FRIES", check: true }, { name: "2x CRAFT SHAKES", check: true }, { name: "0x REGRETS", check: false }] },
        { orderNo: "03", total: "$18", items: [{ name: "1x SPICY EMBER", check: true }, { name: "1x ONION RINGS", check: true }, { name: "1x COLD DRINK", check: true }, { name: "0x EMPTY STOMACH", check: false }] }
    ];

    let currentOrderIndex = 0;
    let isPrinting = false;

    function renderReceipt(index) {
        if(!itemsContainer) return;
        const data = receiptsData[index];
        orderNoEl.innerText = data.orderNo; totalValEl.innerText = data.total;
        itemsContainer.innerHTML = "";
        data.items.forEach(item => {
            const div = document.createElement("div"); div.className = item.check ? "item" : "item crossed";
            div.innerHTML = `<span>${item.name}</span><span>${item.check ? '✓' : '✕'}</span>`; itemsContainer.appendChild(div);
        });
    }
    if(itemsContainer) renderReceipt(0);

    if(printReceipt && sharedSection) {
        window.addEventListener("scroll", () => {
            if (isPrinting) return; 
            const sectionRect = sharedSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const startPrint = windowHeight; const endPrint = -windowHeight * 0.5; 
            const scrolledPast = startPrint - sectionRect.top; const totalDistance = startPrint - endPrint;
            let progress = scrolledPast / totalDistance; progress = Math.max(0, Math.min(1, progress));
            printReceipt.style.clipPath = `inset(0 0 ${100 - (progress * 100)}% 0)`;
            printReceipt.style.transform = `translateY(${-20 + (progress * 20)}px)`;
        });
    }

    if (printAgainBtn) {
        printAgainBtn.addEventListener("click", (e) => {
            e.preventDefault();
            if (isPrinting) return; isPrinting = true;
            printReceipt.style.transition = "none"; printReceipt.style.clipPath = `inset(0 0 100% 0)`; printReceipt.style.transform = `translateY(-20px)`;
            currentOrderIndex = (currentOrderIndex + 1) % receiptsData.length;
            renderReceipt(currentOrderIndex);
            setTimeout(() => {
                let progress = 0;
                const animatePrint = () => {
                    progress += 0.015; if (progress >= 1) { progress = 1; isPrinting = false; }
                    printReceipt.style.clipPath = `inset(0 0 ${100 - (progress * 100)}% 0)`; printReceipt.style.transform = `translateY(${-20 + (progress * 20)}px)`;
                    if (progress < 1) { requestAnimationFrame(animatePrint); }
                };
                requestAnimationFrame(animatePrint);
            }, 100);
        });
    }

    // ==========================================
    // 12. DECONSTRUCT BURGER SCROLL ANIMATION
    // ==========================================
    const deconstructSection = document.getElementById("deconstruct");
    const slices = document.querySelectorAll(".slice");
    const labels = document.querySelectorAll(".label");

    if (deconstructSection) {
        window.addEventListener("scroll", () => {
            const sectionTop = deconstructSection.offsetTop;
            const sectionHeight = deconstructSection.offsetHeight;
            const scrollY = window.scrollY;

            let progress = (scrollY - sectionTop) / (sectionHeight - window.innerHeight);
            progress = Math.max(0, Math.min(1, progress)); 

            let explodeMultiplier = 0;
            if (progress <= 0.5) {
                explodeMultiplier = progress * 2; 
            } else {
                explodeMultiplier = (1 - progress) * 2;
            }

            slices.forEach((slice, index) => {
                let distance = 0;
                const moveAmounts = [-80, -40, 0, 40, 80]; 
                distance = moveAmounts[index] * explodeMultiplier;
                slice.style.transform = `translateY(${distance}px)`;
            });

            labels.forEach((label) => {
                if (explodeMultiplier > 0.2) {
                    label.style.opacity = Math.min(1, (explodeMultiplier - 0.2) * 2);
                } else {
                    label.style.opacity = 0;
                }
            });
        });
    }
});
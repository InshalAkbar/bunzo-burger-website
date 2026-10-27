document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // REGISTER LOGIC
    // ==========================================
    const registerForm = document.getElementById("register-form");
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("reg-name").value;
            const email = document.getElementById("reg-email").value;
            const password = document.getElementById("reg-password").value;

            // Save user to localStorage
            const user = { name, email, password };
            localStorage.setItem("bunzoUser", JSON.stringify(user));

            // Show message and redirect to login
            alert("Registration Successful! Please login now.");
            window.location.href = "login.html?registered=true";
        });
    }

    // ==========================================
    // LOGIN LOGIC (STRICT)
    // ==========================================
    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        // Show toast if redirected from register
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('registered') === 'true' && window.showToast) {
            window.showToast("Account created! Please login.");
        }

        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("login-email").value;
            const password = document.getElementById("login-password").value;

            const storedUser = JSON.parse(localStorage.getItem("bunzoUser"));

            // 1. Check if user exists in localStorage
            if (!storedUser) {
                alert("No account found. Please register first.");
                window.location.href = "register.html"; // Force redirect to register
                return;
            }

            // 2. Check if password matches
            if (storedUser.email === email && storedUser.password === password) {
                // Login successful
                localStorage.setItem("isLoggedIn", "true");
                window.location.href = "../index.html?login=success";
            } else {
                alert("Invalid email or password. Please try again.");
            }
        });
    }
});
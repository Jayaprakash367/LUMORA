document.addEventListener('DOMContentLoaded', function () {
    const sidenav = document.querySelector('.side-navbar');
    const menuBtn = document.querySelector('.navbar-menu-toggle');
    const closeBtn = document.querySelector('.side-navbar-exit');

    // Side navigation toggle logic from your existing index.js
    if (menuBtn && sidenav) {
        menuBtn.addEventListener('click', () => {
            sidenav.classList.toggle('open');
        });
    }

    if (closeBtn && sidenav) {
        closeBtn.addEventListener('click', () => {
            sidenav.classList.remove('open');
        });
    }

    // Password show/hide toggle logic (only if elements exist on the page)
    const togglePassword = document.getElementById('togglePassword');
    const pwd = document.getElementById('password');
    if (togglePassword && pwd) {
        togglePassword.addEventListener('click', function() {
            if (pwd.type === 'password') {
                pwd.type = 'text';
                this.src = 'https://cdn-icons-png.flaticon.com/128/2767/2767146.png';
                this.title = 'Hide Password';
                this.alt = 'Hide Password';
                this.style.opacity = 1;
            } else {
                pwd.type = 'password';
                this.src = 'https://cdn-icons-png.flaticon.com/128/709/709612.png';
                this.title = 'Show Password';
                this.alt = 'Show Password';
                this.style.opacity = 0.7;
            }
        });
    }

    // REMOVED: Redundant login form submission logic from index.js
    // This logic is now solely handled in login.html as per your existing file.
    // The commented out block below is what was removed from the original index.js.
    /*
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            event.preventDefault();
            const user = document.getElementById("username").value;
            const pass = document.getElementById("password").value;

            if (user === validCredentials.username && pass === validCredentials.password) {
                sessionStorage.setItem('isLoggedIn', 'true');
                showMessage("Login successful! Redirecting...", true);
                setTimeout(() => {
                    window.location.href = "main.html";
                }, 1500);
            } else {
                showMessage("Invalid username or password.");
            }
        });
    }
    */

    // Slider functionality (kept as is)
    const slides = document.querySelectorAll('.slider-img');
    let current = 0;
    if (slides.length > 0) { // Only run if slider images exist
        setInterval(() => {
            slides[current].classList.remove('active');
            current = (current + 1) % slides.length;
            slides[current].classList.add('active');
        }, 3000);
    }
});

// Function to display custom message (globally accessible)
// This function's styles are inline within the JS and do not affect external CSS files.
function showMessage(message, isSuccess = false) {
    let messageBox = document.getElementById('messageBox');
    if (!messageBox) { // Create message box if it doesn't exist
        messageBox = document.createElement('div');
        messageBox.id = 'messageBox';
        document.body.appendChild(messageBox);
        messageBox.style.cssText = `
            display: none;
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            z-index: 1000;
            text-align: center;
            color: white;
            font-family: Arial, sans-serif;
        `;
    }
    messageBox.textContent = message;
    messageBox.style.backgroundColor = isSuccess ? '#4CAF50' : '#f44336';
    messageBox.style.display = 'block';
    setTimeout(() => {
        messageBox.style.display = 'none';
    }, 3000);
}

// Global functions for side navbar (kept as is, but ensure these are called correctly from HTML if not part of DOMContentLoaded)
// Note: Your main.html calls shownav() directly from onclick.
function shownav() {
    document.querySelector('.side-navbar').classList.add('open'); // Use classList.add to open
}

function closenav() { // This function is not directly used in your main.html's side-navbar-exit onclick.
    document.querySelector('.side-navbar').classList.remove('open'); // Use classList.remove to close
}

// The toggleSearch function was in your index.js, keeping it if intended.
function toggleSearch() {
  const bar = document.getElementById("searchBar");
  bar.classList.toggle("active");
}
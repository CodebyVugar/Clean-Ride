const forms = document.querySelector(".forms"),
    pwShowHide = document.querySelectorAll(".eye-icon"),
    links = document.querySelectorAll(".link"),
    signupForm = document.getElementById("signup-form"),
    otpField = document.querySelector(".otp-field"),
    signupButton = document.getElementById("signup-button"),
    verifyOtpButton = document.getElementById("verify-otp"),
    forgetPasswordForm = document.getElementById("forget-password-form"),
    forgetEmailInput = document.getElementById("forget-email");
    loginForm = document.querySelector(".login form");

// Password show/hide functionality
pwShowHide.forEach(eyeIcon => {
    eyeIcon.addEventListener("click", () => {
        let password = eyeIcon.previousElementSibling;

        if (password.type === "password") {
            password.type = "text";
            eyeIcon.classList.replace("bx-hide", "bx-show");
            return;
        }
        password.type = "password";
        eyeIcon.classList.replace("bx-show", "bx-hide");
    });
});

// Form link click functionality (for login, signup, forget password)
links.forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault(); // Prevent default form submission behavior

        if (link.classList.contains('signup-link')) {
            forms.classList.add("show-signup");
            forms.classList.remove("show-forget-password");
        } else if (link.classList.contains('login-link')) {
            forms.classList.remove("show-signup");
            forms.classList.remove("show-forget-password");
        } else if (link.classList.contains('forget-password-link')) {
            forms.classList.add("show-forget-password");
            forms.classList.remove("show-signup");
        }
    });
});


// Login form submit handler


loginForm.addEventListener("submit", function (e) {

    e.preventDefault();  // Prevent the form from being submitted automatically
    const email = document.querySelector(".login input[type='email']").value;
    const password = document.querySelector(".login input[type='password']").value;

    if (!email || !password) {
        alert("Please fill in both fields.");
        return;
    }

    // API request to validate login credentials
    fetch('https://e295-94-20-49-98.ngrok-free.app/api/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email, password: password }),
    })
    .then(response => response.text())
    .then(text => {
        console.log("Backend response:", text);  // Log the backend response for debugging
        if (text.includes("success")) {
            alert("Login successful!");
            window.location.replace("index.html");  // Redirect to index.html on successful login
        } else {
            alert("Invalid credentials. Please try again.");
        }
    })
    .catch(error => {
        console.error("Error during login:", error);
        alert("An error occurred during login.");
    });
});




// Forget Password form submit handler
forgetPasswordForm.addEventListener("submit", function (e) {
    e.preventDefault();  // Formun avtomatik göndərilməsini dayandırırıq
    const emailInput = forgetEmailInput.value;

    if (!emailInput) {
        alert("Please enter your email.");
        return;
    }

    // OTP göndərmək və ya şifrə sıfırlamaq prosesi burada həyata keçirilə bilər.
    // Bu vaxt, istifadəçini Signup hissəsinə yönləndiririk.
    alert("Please register again");

    // Forget Password-dan sonra Signup hissəsinə keçirik
    forms.classList.add("show-signup");
    forms.classList.remove("show-forget-password");
});

// Signup form submit handler
let email = "";  // Email-i burada saxlayırıq

signupForm.addEventListener("submit", function (e) {
    e.preventDefault();  // Formun avtomatik göndərilməsini dayandırırıq

    const emailInput = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // API-yə signup məlumatlarını göndəririk
    fetch('https://e295-94-20-49-98.ngrok-free.app/api/user/sign-up', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: emailInput, password: password }),
    })
    .then(response => response.text())
    .then(text => {
        console.log("Backend response:", text);  // Backend-dən gələn mətni konsola yazdırmaq
        if (text.includes("success")) {
            alert("Signup successful! Please verify OTP.");
            otpField.style.display = "block";
            signupButton.style.display = "none";
            verifyOtpButton.style.display = "inline-block";

            // Email-i qeyd edirik ki, OTP təsdiqləmə zamanı göndərək
            email = emailInput;

            // OTP səhifəsinə yönləndiririk
            window.location.href = "#otp-section";  // OTP bölməsinə yönləndiririk
        } else {
            alert("Signup failed! Please try again.");
        }
    })
    .catch(error => {
        console.error("Error during signup:", error);
        alert("An error occurred during signup.");
    });
});

// OTP Verification Button Event
verifyOtpButton.addEventListener("click", function (e) {
    e.preventDefault();  // Bu, səhifənin yenilənməsinin qarşısını alacaq
    
    const otp = document.getElementById("otp").value;
    
    // OTP requestini backend-ə göndəririk
    fetch('https://e295-94-20-49-98.ngrok-free.app/api/user/verify-otp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,  // Signup-dan əldə etdiyimiz email
            otp: otp       // İstifadəçinin daxil etdiyi OTP
        }),
    })
    .then(response => response.text())
    .then(text => {
        console.log("OTP verification response:", text);
        if (text.includes("success")) {
            alert("OTP verified successfully!");
            window.location.replace("index.html");
        } else {
            alert("Invalid OTP. Please try again.");
        }
    })
    .catch(error => {
        console.error("Error during OTP verification:", error);
        alert("An error occurred during OTP verification.");
    });
});

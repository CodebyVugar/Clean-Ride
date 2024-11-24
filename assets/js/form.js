const forms = document.querySelector(".forms"),
    pwShowHide = document.querySelectorAll(".eye-icon"),
    links = document.querySelectorAll(".link"),
    signupForm = document.getElementById("signup-form"),
    otpField = document.querySelector(".otp-field"),
    signupButton = document.getElementById("signup-button"),
    verifyOtpButton = document.getElementById("verify-otp");


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

// Signup form submit handler
// Signup form submit handler
let signUpResponse = "";  // Signup cavabını saxlamaq üçün dəyişən

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
    console.log("saadsdsa");
    
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
            console.log("isleyir");
            window.location.replace("index.html");
            // Signup-u başarılı şəkildə tamamladı
        } else {
            alert("Invalid OTP. Please try again.");
        }
    })
    .catch(error => {
        console.error("Error during OTP verification:", error);
        alert("An error occurred during OTP verification.");
    });
});


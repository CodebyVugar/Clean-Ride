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
signupForm.addEventListener("submit", function (e) {
    e.preventDefault();  // Prevent form from submitting

    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;
    const confirmPassword = document.getElementById("confirm-password").value;

    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    // If validation passed, show OTP field
    otpField.style.display = "block";
    signupButton.style.display = "none";  // Hide the Signup button after OTP field appears
    verifyOtpButton.style.display = "inline-block";  // Show Verify OTP button
});

// OTP Verification Button Event
verifyOtpButton.addEventListener("click", function () {
    const otp = document.getElementById("otp").value;

    // This part would normally verify OTP with backend
    if (otp === "123456") {  // Example of correct OTP
        alert("OTP verified successfully!");
        // Proceed with signup after OTP is verified (e.g., send data to backend)
    } else {
        alert("Invalid OTP. Please try again.");
    }
});

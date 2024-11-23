const forms = document.querySelector(".forms"),
    pwShowHide = document.querySelectorAll(".eye-icon"),
    links = document.querySelectorAll(".link");

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

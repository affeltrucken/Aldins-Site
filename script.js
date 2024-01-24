document.addEventListener("DOMContentLoaded", function() {
    var fadeInElements = document.getElementsByClassName("invisible-animated");

    window.addEventListener('scroll', function() {
        Array.from(fadeInElements).forEach(function(fadeIn) {
            var elementTop = fadeIn.getBoundingClientRect().top;
            var viewportHeight = window.innerHeight;

            // Check if the element is in viewport and if it doesn't already have the 'fade-in' class
            if (elementTop < viewportHeight - 50 && !fadeIn.classList.contains("fade-in")) {
                fadeIn.classList.add("fade-in");
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", function() {
    var fadeInElements = document.getElementsByClassName("invisible-animated");

    window.addEventListener('scroll', function() {
        Array.from(fadeInElements).forEach(function(fadeIn) {
            var elementTop = fadeIn.getBoundingClientRect().top;
            var viewportHeight = window.innerHeight;

            if (elementTop < viewportHeight - 50 && !fadeIn.classList.contains("fade-in")) {
                fadeIn.classList.add("fade-in");
            }
        });
    });
});

document.getElementById('darkMode').addEventListener('click', function() {
    document.getElementById('mainContainer').classList.toggle('inverted');
});
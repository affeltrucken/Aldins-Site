document.getElementById('darkMode').addEventListener('click', function() {
    var mainContainer = document.getElementById('mainContainer');
    if (mainContainer.classList.contains('inverted')) {
        // Dark mode is currently enabled, so we apply the reverse animation
        mainContainer.style.animation = 'reverse-invert 1s forwards';
    } else {
        // Dark mode is not enabled, apply the normal animation
        mainContainer.style.animation = 'invert 1s forwards';
    }
    mainContainer.classList.toggle('inverted');
});

document.getElementById('mainContainer').addEventListener('animationend', function() {
    this.style.animation = '';
});
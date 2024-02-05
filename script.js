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

fetch('https://api.github.com/users/affeltrucken/repos')
    .then(response => response.json())
    .then(data => {
    const container = document.getElementById('repo-container'); // Ensure this ID matches your container's ID in HTML
    data.forEach(repo => {
        // Create the .repo container
        const repoDiv = document.createElement('div');
        repoDiv.classList.add('repo');

        // Create the .content wrapper
        const contentDiv = document.createElement('div');
        contentDiv.classList.add('content');

        // Create and append the repository title (link)
        const titleLink = document.createElement('a');
        titleLink.href = repo.html_url;
        titleLink.textContent = repo.name;
        titleLink.classList.add('repo-title');
        contentDiv.appendChild(titleLink);

        // Check if the repository has a description
        if (repo.description) {
            // Create and append the description paragraph
            const descriptionPara = document.createElement('p');
            descriptionPara.textContent = repo.description;
            descriptionPara.classList.add('repo-description'); // Add a class for styling
            contentDiv.appendChild(descriptionPara);
        }

        // Append the .content wrapper to the .repo container, then append it to the main container
        repoDiv.appendChild(contentDiv);
        container.appendChild(repoDiv);
    })
    .catch(error => console.error('Error:', error));
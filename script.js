
  
  function addScrollFadeInAnimation() {
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          // Element is now intersecting, proceed with animation or visibility change
          entry.target.classList.add('fade-in');
        } else {
          // Optionally, handle the case when element is not intersecting or intersectionRatio is not as desired
          // This could involve resetting elements to a default state if they become non-intersecting after being intersecting
        }
      });
    }, { threshold: 1.0 }); // Adjust threshold as needed
  
    document.querySelectorAll('.hidden').forEach(el => {
      observer.observe(el);
    });
  }

function darkModeButton() {
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
}
function getGithubRepos() {
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
        titleLink.classList.add('small');
        titleLink.classList.add('semibold');
        contentDiv.appendChild(titleLink);

        // Check if the repository has a description
        if (repo.description) {
            // Create and append the description paragraph
            const descriptionPara = document.createElement('p');
            descriptionPara.textContent = repo.description;
            descriptionPara.classList.add('repo-description'); // Add a class for styling
            descriptionPara.classList.add('thin'); // Add a class for styling
            contentDiv.appendChild(descriptionPara);
        }

        // Append the .content wrapper to the .repo container, then append it to the main container
        repoDiv.appendChild(contentDiv);
        container.appendChild(repoDiv);
    });
    })
    .catch(error => console.error('Error:', error));
}

function getGithubBio() {
    fetch('https://api.github.com/users/affeltrucken')
    .then(response => response.json())
    .then(data => {
      var githubDescription = document.getElementById("github-profile-description")
      githubDescription.textContent = data.bio
    })
    .catch(error => console.error('Error fetching GitHub profile:', error));
}

function main(){
    Promise.all(

        [
            darkModeButton(),
            getGithubBio(),
            getGithubRepos()
            
        ]
    ).then(() => {
        document.querySelectorAll('.hidden').forEach(el => {
            // Initialize elements as if they are not intersecting
            // This can be through CSS or directly here if needed
            // For example, setting opacity to 0 through JavaScript: el.style.opacity = '0';
          });
    addScrollFadeInAnimation()
})
}

main()


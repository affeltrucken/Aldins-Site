
  
function addScrollFadeInAnimation() {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      console.log(entry.intersectionRatio)
      if (entry.isIntersecting && entry.intersectionRatio > calculateThreshold()) {
        // Element is now intersecting, proceed with animation or visibility change
        entry.target.classList.add('fade-in');
      }
    });
  }, { threshold: calculateThreshold() }); // Initial threshold based on viewport width

  document.querySelectorAll('.hidden').forEach(el => {
    observer.observe(el);
  });

  // Function to calculate threshold based on viewport width
  function calculateThreshold() {
    if (window.innerWidth < 800){
      return 0.6;
    }


    return 0.8;
  }
}
function getGithubRepos() {
  // Check if cached data exists and is still valid
  const cachedRepos = localStorage.getItem('githubRepos');
  const lastFetchTime = localStorage.getItem('lastFetchTime');
  const currentTime = new Date().getTime();
  
  if (cachedRepos && lastFetchTime && (currentTime - lastFetchTime) < 86400000) { // 86400000 ms = 24 hours
      // Use cached data
      const data = JSON.parse(cachedRepos);
      displayRepos(data);
  } else {
      // Fetch new data
      fetch('https://api.github.com/users/affeltrucken/repos')
      .then(response => response.json())
      .then(data => {
          // Cache the data along with the current timestamp
          localStorage.setItem('githubRepos', JSON.stringify(data));
          localStorage.setItem('lastFetchTime', currentTime.toString());
          displayRepos(data);
      })
      .catch(error => console.error('Error:', error));
  }
}

function displayRepos(data) {
  const container = document.getElementById('repo-container'); // Ensure this ID matches your container's ID in HTML
  const numberOfReposToShow = 5; // Change this to the desired number of repos to display
  let reposDisplayed = 0;
  
  data.forEach(repo => {
      if (reposDisplayed >= numberOfReposToShow) {
          return; // Stop iterating if the desired number of repos is reached
      }
  
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
  
      reposDisplayed++;
  });
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
            getGithubRepos(),
            getGithubBio()
            
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


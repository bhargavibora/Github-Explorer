document.getElementById('search-button').addEventListener('click', function() {
  var username = document.getElementById('search-input').value;
  var profileUrl = 'https://api.github.com/users/' + username;
  var reposUrl = 'https://api.github.com/users/' + username + '/repos';

  fetch(profileUrl)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Unable to fetch user data');
      }
      return response.json();
    })
    .then(function(userData) {
      var followersCount = userData.followers;
      var profilePicture = userData.avatar_url;
      var username = userData.login;

      var resultsContainer = document.getElementById('results');
      resultsContainer.innerHTML = '';

      // Display profile
      var profileContainer = document.createElement('div');
      profileContainer.classList.add('profile');

      var profilePictureEl = document.createElement('img');
      profilePictureEl.src = profilePicture;
      profilePictureEl.alt = 'Profile picture';
      profilePictureEl.style.width = '100px';

      var profileName = document.createElement('h2');
      profileName.textContent = userData.name;

      var profileUsername = document.createElement('p');
      profileUsername.textContent = 'Username: ' + username;

      var profileRepositories = document.createElement('p');
      profileRepositories.textContent = 'Repositories: ' + userData.public_repos;

      var profileFollowers = document.createElement('p');
      profileFollowers.textContent = 'Followers: ' + followersCount;

      var profileLink = document.createElement('a');
      profileLink.href = userData.html_url;
      profileLink.textContent = 'View Profile';
      profileLink.target = '_blank';

      profileContainer.appendChild(profilePictureEl);
      profileContainer.appendChild(profileName);
      profileContainer.appendChild(profileUsername);
      profileContainer.appendChild(profileRepositories);
      profileContainer.appendChild(profileFollowers);
      profileContainer.appendChild(profileLink);

      resultsContainer.appendChild(profileContainer);

      // Fetch repositories
      fetch(reposUrl)
        .then(function(response) {
          if (!response.ok) {
            throw new Error('Unable to fetch user repositories');
          }
          return response.json();
        })
        .then(function(userRepos) {
          // Display repositories
          userRepos.forEach(function(repo) {
            var repoContainer = document.createElement('div');
            repoContainer.classList.add('repo');

            var repoName = document.createElement('h3');
            repoName.textContent = repo.name;

            var repoDescription = document.createElement('p');
            repoDescription.textContent = repo.description;

            repoContainer.appendChild(repoName);
            repoContainer.appendChild(repoDescription);

            resultsContainer.appendChild(repoContainer);
          });
        })
        .catch(function(error) {
          console.log('Error:', error);
        });
    })
    .catch(function(error) {
      console.log('Error:', error);
    });
});

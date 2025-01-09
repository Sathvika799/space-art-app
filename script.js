const NASA_API_URL = 'https://api.nasa.gov/planetary/apod?api_key=XZGBuP8MiSIVrQeWbusZe25eOwIfAaGCgOuepK5K';
const MET_API_SEARCH_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/search?q=';
const MET_API_OBJECT_URL = 'https://collectionapi.metmuseum.org/public/collection/v1/objects/';

document.addEventListener('DOMContentLoaded', () => {
  fetchNASAData();
  fetchRandomArtwork();
});

function fetchNASAData() {
  fetch(NASA_API_URL)
    .then(response => response.json())
    .then(data => {
      const spaceDiv = document.getElementById('space-data');
      spaceDiv.innerHTML = `
        <h3>${data.title}</h3>
        <p>${data.date}</p>
        <img src="${data.url}" alt="${data.title}" class="animate-image">
        <p>${data.explanation}</p>
      `;
      applyImageAnimation(spaceDiv.querySelector('img'));
    })
    .catch(error => {
      document.getElementById('space-data').innerHTML = '<p>Error loading space data.</p>';
      console.error('Error fetching NASA data:', error);
    });
}

function fetchRandomArtwork() {
  const randomKeywords = ['sun', 'moon', 'star', 'landscape', 'portrait'];
  const randomKeyword = randomKeywords[Math.floor(Math.random() * randomKeywords.length)];
  
  fetch(`${MET_API_SEARCH_URL}${randomKeyword}`)
    .then(response => response.json())
    .then(data => {
      if (data.total > 0) {
        const randomObjectId = data.objectIDs[Math.floor(Math.random() * data.objectIDs.length)];
        return fetch(`${MET_API_OBJECT_URL}${randomObjectId}`);
      } else {
        throw new Error('No artwork found for the keyword');
      }
    })
    .then(response => response.json())
    .then(artData => {
      const artDiv = document.getElementById('art-data');
      artDiv.innerHTML = `
        <h3>${artData.title}</h3>
        <p>${artData.artistDisplayName || 'Unknown Artist'}</p>
        <img src="${artData.primaryImage || 'https://via.placeholder.com/300'}" alt="${artData.title}" class="animate-image">
        <p>${artData.objectDate || 'Unknown Date'}</p>
      `;
      applyImageAnimation(artDiv.querySelector('img'));
    })
    .catch(error => {
      document.getElementById('art-data').innerHTML = '<p>Error loading artwork data.</p>';
      console.error('Error fetching art data:', error);
    });
}

// Function to apply animation to images
function applyImageAnimation(image) {
  if (image) {
    setTimeout(() => {
      image.classList.add('zoomed-in');
    }, 100); // Add slight delay for animation effect
  }
}

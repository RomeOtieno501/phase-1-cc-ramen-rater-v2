// index.js

// Callbacks
const handleClick = (ramen) => {
  document.querySelector('#ramen-detail img').src = ramen.image;
  document.querySelector('#ramen-detail h2').textContent = ramen.name;
  document.querySelector('#ramen-detail h3').textContent = ramen.restaurant;
  document.querySelector('#rating-display').textContent = ramen.rating;
  document.querySelector('#comment-display').textContent = ramen.comment;
// Add code
};

const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit', event => {
    event.preventDefault();
    const newRamen = {
      name: event.target['new-name'].value,
      restaurant: event.target['new-restaurant'].value,
      image: event.target['new-image'].value,
      rating: event.target['new-rating'].value,
      comment: event.target['new-comment'].value
    };
    const img = document.createElement('img');
    img.src = newRamen.image;
    img.addEventListener('click', () => handleClick(newRamen));
    document.getElementById('ramen-menu').appendChild(img);
    form.reset();
  });
  // Add code
}

const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(ramens => {
      const ramenMenu = document.getElementById('ramen-menu');
      ramens.forEach(ramen => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.addEventListener('click', () => handleClick(ramen));
        ramenMenu.appendChild(img);
      });
      // Display the first ramen's details on page load
      if (ramens.length > 0) {
        handleClick(ramens[0]);
      }
    })
    .catch(error => console.error('Error fetching ramens:', error));
  // Add code
};

const main = () => {
  // Invoke displayRamens here
  displayRamens()
  // Invoke addSubmitListener here
  addSubmitListener()
};
main()

document.addEventListener('DOMContentLoaded', main);

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};

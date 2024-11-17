import fetchAndUpdateCards from "../../infrastructure/scryfall/updateCards";


// Execute the function directly
fetchAndUpdateCards()
  .then(() => console.log('Card update completed!'))
  .catch((err) => console.error('Card update failed:', err));
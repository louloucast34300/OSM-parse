
const axios = require('axios');

// Fonction pour obtenir les coordonnées d'un code postal
const obtenirCoordonnees = async (codePostal) => {
    const url = `https://nominatim.openstreetmap.org/search?postalcode=${codePostal}&country=France&format=json&limit=1`;
    try {
      const response = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (response.data.length > 0) {
        const latitude = response.data[0].lat;
        const longitude = response.data[0].lon;
        return { codePostal, latitude, longitude };
      }
    } catch (error) {
      console.error(`Erreur lors de la récupération des coordonnées pour le code postal ${codePostal}: `, error);
    }
    return { codePostal, latitude: null, longitude: null };
  };
  
  module.exports = obtenirCoordonnees;
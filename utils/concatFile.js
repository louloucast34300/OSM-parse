const fs = require('fs');
const path = require('path');
const importJSON = require('./importFile')
const concatenerFichiersJSON = async (cheminRepertoire) => {
    try {
      // Lister tous les fichiers dans le répertoire
      const fichiers = await fs.promises.readdir(cheminRepertoire);
  
      // Filtrer les fichiers JSON
      const fichiersJSON = fichiers.filter(fichier => fichier.endsWith('.json'));
  
      // Lire et concaténer les données de chaque fichier JSON
      let concatenatedData = { data: [] };
      for (let fichier of fichiersJSON) {
        const cheminFichier = path.resolve(cheminRepertoire, fichier);
        const data = await importJSON(cheminFichier);
        concatenatedData.data.push(...data.data);
      }
  
      return concatenatedData;
    } catch (error) {
      console.error('Erreur lors de la lecture ou de la concaténation des fichiers JSON:', error);
      throw error;
    }
  };

  module.exports = concatenerFichiersJSON

const async = require('async');
const path = require('path');

const exportJSON = require('./utils/exportFile');
const concatJSON = require('./utils/concatFile');
const getCoord = require('./utils/getCoord');
const logProgress = require('./utils/logProgress');


const main = async () => {
  try {
    const directoryInputPath = path.join(__dirname, '/data/input');
    const directoryOutputPath = path.join(__dirname, '/data/output');

    const concatenatedData = await concatJSON(directoryInputPath)
    const fileOutputPath = path.resolve(directoryOutputPath, 'output.json');

    const data = concatenatedData

    // Obtenir une liste unique de codes postaux
    const codesPostaux = [...new Set(data.data.map(item => item["code postal"]))];

    const coordonnees = {};
    await async.eachOfSeries(codesPostaux, async (codePostal, index) => {
        const resultat = await getCoord(codePostal);
        coordonnees[codePostal] = { latitude: resultat.latitude, longitude: resultat.longitude };
        logProgress(index + 1, codesPostaux.length);
        await new Promise(resolve => setTimeout(resolve, 1000)); // Pause de 1 seconde entre les requêtes
      });

    // Regrouper les éléments par code postal avec les coordonnées
    const resultats = data.data.reduce((acc, item) => {
      if (!acc[item['code postal']]) {
        acc[item['code postal']] = {
          "code postal": item['code postal'],
          "ville": item.ville,
          "lat": coordonnees[item['code postal']].latitude,
          "lon": coordonnees[item['code postal']].longitude,
          "elements": []
        };
      }
      acc[item['code postal']].elements.push({
        "Produit": item.Produit,
        "date": item.date
      });
      return acc;
    }, {});

    const resultatFinal = {"data": Object.values(resultats)};

    await exportJSON(fileOutputPath, resultatFinal);
    console.log('Les résultats ont été enregistrés dans', fileOutputPath);

  } catch (error) {
    console.error('Erreur:', error);
  }
};

main();

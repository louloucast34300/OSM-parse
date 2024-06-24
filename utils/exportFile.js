const fs = require('fs');

const enregistrerFichierJSON = (chemin, data) => {
    return new Promise((resolve, reject) => {
      fs.writeFile(chemin, JSON.stringify(data, null, 2), 'utf8', (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  };

  module.exports = enregistrerFichierJSON
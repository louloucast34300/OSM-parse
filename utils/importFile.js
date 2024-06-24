const fs = require('fs');

const lireFichierJSON = (chemin) => {
    return new Promise((resolve, reject) => {
      fs.readFile(chemin, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(data));
        }
      });
    });
  };


  module.exports = lireFichierJSON
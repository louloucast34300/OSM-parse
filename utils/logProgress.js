const logProgress = (current, total) => {
    const pourcentage = ((current / total) * 100).toFixed(2);
    console.log(`Progression: ${pourcentage}% (${current}/${total})`);
  };

module.exports = logProgress
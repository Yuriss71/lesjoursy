const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname)));

// Route principale
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Le serveur est lancé sur http://localhost:${port}`);
}); 


// Remplace ceci par la date de publication de l'article (format YYYY-MM-DD HH:MM:SS)
const publicationDate = new Date("2024-03-12T08:00:00"); // Exemple : 12 mars 2024 à 8h

function updateElapsedTime() {
    const now = new Date();
    const diffMs = now - publicationDate; // Différence en millisecondes
    const hoursElapsed = Math.floor(diffMs / (1000 * 60 * 60)); // Conversion en heures
    document.getElementById("timeElapsed").textContent = `${hoursElapsed} heures`;
}

// Met à jour le temps toutes les minutes
setInterval(updateElapsedTime, 60000);

// Appelle la fonction immédiatement au chargement de la page
updateElapsedTime();

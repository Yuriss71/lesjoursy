// Fonction pour mettre à jour le temps écoulé pour chaque article
function updateElapsedTime() {
    // Sélectionne tous les éléments qui ont l'attribut "data-publication"
    document.querySelectorAll(".timeElapsed").forEach(element => {
        // Récupère la date de publication depuis l'attribut "data-publication"
        const publicationDate = new Date(element.getAttribute("data-publication"));
        const now = new Date();
        const diffMs = now - publicationDate; // Différence en millisecondes

        // Calcul du temps écoulé en heures, minutes et secondes
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

        // Mise à jour du texte dans l'élément
        element.textContent = `${hours}h ${minutes}m ${seconds}s`;
    });
}

// Met à jour le temps toutes les secondes
setInterval(updateElapsedTime, 1000);

// Met à jour immédiatement au chargement
updateElapsedTime();

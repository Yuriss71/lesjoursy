function updateElapsedTime() {
    document.querySelectorAll(".timeElapsed").forEach(element => {
        const publicationDate = new Date(element.getAttribute("data-publication"));
        const now = new Date();
        const diffMs = now - publicationDate;

        const seconds = Math.floor(diffMs / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);

        let timeString = "";
        if (days >= 30) {
            timeString = `${months} mois`;
        } else if (hours >= 24) {
            timeString = `${days} jours`;
        } else {
            timeString = `${hours}h ${minutes % 60}m ${seconds % 60}s`;
        }

        element.textContent = timeString;
    });
}

setInterval(updateElapsedTime, 1000);
updateElapsedTime();

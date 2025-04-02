document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');

    // Fonction pour effectuer la recherche
    function performSearch(query) {
        // Liste de tous les éléments à rechercher (articles, etc.)
        const searchableItems = document.querySelectorAll('.service-card, .carousel-slide');
        const resultsContainer = document.createElement('div');
        resultsContainer.id = 'search-results';
        resultsContainer.style.position = 'absolute';
        resultsContainer.style.top = '100%';
        resultsContainer.style.left = '0';
        resultsContainer.style.width = '100%';
        resultsContainer.style.backgroundColor = 'white';
        resultsContainer.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        resultsContainer.style.zIndex = '1000';
        resultsContainer.style.maxHeight = '400px';
        resultsContainer.style.overflowY = 'auto';
        
        // Supprimer les anciens résultats s'ils existent
        const oldResults = document.getElementById('search-results');
        if (oldResults) {
            oldResults.remove();
        }

        if (query.trim() === '') {
            return;
        }

        let hasResults = false;

        searchableItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            if (text.includes(query.toLowerCase())) {
                hasResults = true;
                const resultItem = document.createElement('a');
                resultItem.href = item.closest('a') ? item.closest('a').href : '#';
                resultItem.style.display = 'block';
                resultItem.style.padding = '10px';
                resultItem.style.borderBottom = '1px solid #eee';
                resultItem.style.color = '#333';
                resultItem.style.textDecoration = 'none';
                
                // Copier le contenu de l'élément trouvé
                const title = item.querySelector('h3') ? item.querySelector('h3').textContent : 'Article sans titre';
                const excerpt = item.querySelector('p') ? item.querySelector('p').textContent : '';
                
                const titleElem = document.createElement('div');
                titleElem.textContent = title;
                titleElem.style.fontWeight = 'bold';
                
                const excerptElem = document.createElement('div');
                excerptElem.textContent = excerpt;
                excerptElem.style.fontSize = '0.9em';
                excerptElem.style.color = '#666';
                
                resultItem.appendChild(titleElem);
                resultItem.appendChild(excerptElem);
                
                resultsContainer.appendChild(resultItem);
            }
        });

        if (hasResults) {
            searchForm.appendChild(resultsContainer);
        } else {
            const noResults = document.createElement('div');
            noResults.textContent = 'Aucun résultat trouvé';
            noResults.style.padding = '10px';
            noResults.style.color = '#666';
            resultsContainer.appendChild(noResults);
            searchForm.appendChild(resultsContainer);
        }
    }

    // Gestion de la soumission du formulaire
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            // Ici vous pouvez rediriger vers une page de résultats ou afficher les résultats
            alert(`Recherche pour: ${query}`);
            // Ou rediriger vers une page de résultats:
            // window.location.href = `/recherche?q=${encodeURIComponent(query)}`;
        }
    });

    // Recherche en temps réel
    searchInput.addEventListener('input', function() {
        performSearch(this.value);
    });

    // Fermer les résultats quand on clique ailleurs
    document.addEventListener('click', function(e) {
        if (!searchForm.contains(e.target)) {
            const results = document.getElementById('search-results');
            if (results) {
                results.remove();
            }
        }
    });
});
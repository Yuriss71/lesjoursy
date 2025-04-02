document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    
    // Liste des articles disponibles
    const articles = [
        { title: "Article 1", url: "articles/article1.html", description: "Description de l'article 1" },
        { title: "Article 2", url: "articles/article2.html", description: "Description de l'article 2" },
        { title: "Article 3", url: "articles/article3.html", description: "Description de l'article 3" },
        { title: "Article 4", url: "articles/article4.html", description: "Description de l'article 4" }
    ];

    function showResults(results) {
        // Supprimer les anciens résultats
        const oldResults = document.getElementById('search-results');
        if (oldResults) oldResults.remove();

        if (searchInput.value.trim() === '') return;

        const resultsContainer = document.createElement('div');
        resultsContainer.id = 'search-results';

        if (results.length === 0) {
            resultsContainer.innerHTML = `<div class="no-results">Aucun article trouvé</div>`;
        } else {
            results.forEach(article => {
                const articleElement = document.createElement('a');
                articleElement.href = article.url;
                articleElement.className = 'search-result';
                articleElement.innerHTML = `
                    <h4>${article.title}</h4>
                    <p>${article.description}</p>
                `;
                resultsContainer.appendChild(articleElement);
            });
        }

        searchForm.appendChild(resultsContainer);
    }

    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        const results = articles.filter(article => 
            article.title.toLowerCase().includes(query) || 
            article.description.toLowerCase().includes(query)
        );
        showResults(results);
    });

    // Fermer les résultats quand on clique ailleurs
    document.addEventListener('click', function(e) {
        if (!searchForm.contains(e.target)) {
            const results = document.getElementById('search-results');
            if (results) results.remove();
        }
    });

    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const query = searchInput.value.trim();
        if (query) {
            const results = articles.filter(article => 
                article.title.toLowerCase().includes(query.toLowerCase()) || 
                article.description.toLowerCase().includes(query.toLowerCase())
            );
            
            if (results.length === 1) {
                // Si un seul résultat, rediriger directement
                window.location.href = results[0].url;
            } else if (results.length > 1) {
                // Stocker les résultats pour une page dédiée si besoin
                localStorage.setItem('searchResults', JSON.stringify(results));
                window.location.href = `search-results.html?q=${encodeURIComponent(query)}`;
            }
        }
    });
});
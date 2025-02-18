package main

import (
	"fmt"
	"log"
	"net/http"
)

func main() {
	// Définir le port
	port := ":8080"

	// Servir les fichiers statiques (CSS, JS, images)
	fs := http.FileServer(http.Dir("."))
	http.Handle("/styles/", fs)
	http.Handle("/images/", fs)
	http.Handle("/js/", fs)
	http.Handle("/articles/", fs)

	// Route principale
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		if r.URL.Path == "/" {
			http.ServeFile(w, r, "index.html")
			return
		}
		// Servir le fichier directement
		http.FileServer(http.Dir(".")).ServeHTTP(w, r)
	})

	// Démarrer le serveur
	fmt.Printf("Serveur démarré sur http://localhost%s\n", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		log.Fatal(err)
	}
}

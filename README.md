# Dev Web - TP5

## Partie 1 : serveur HTTP natif Node.js

### Question 1.1 donner la liste des en-têtes de la réponse HTTP du serveur.


En-têtes de la réponse HTTP du serveur :   

 * Connection :  keep-alive  
 * Date :  Sun,21 Sep 2025 04:02:54 GMT  
 * Keep-alive :  timeout = 5  
 * Transfer-encoding :  chunked

### Question 1.2 donner la liste des en-têtes qui ont changé depuis la version précédente.

Après avoir remplacer la fonction requestListener() par la suivante :

```js
function requestListener(_request, response) {
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify({ message: "I'm OK" }));
}
```

On obtient l'en-têtes de la reponse HTTP du serveur suivante :

 * Connection :  keep-alive
 * Content-Length :  20
 * Content-Type :  application/json
 * Date :  Sun,21 Sep 2025 04:10:17 GMT  
 * Keep-alive :  timeout = 5  
 









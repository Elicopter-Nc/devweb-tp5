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
 

### Question 1.3 que contient la réponse reçue par le client ?

On remplace la fonction requestListener() par la suivante : 

```js
import fs from "node:fs/promises";

function requestListener(_request, response) {
  fs.readFile("index.html", "utf8")
    .then((contents) => {
      response.setHeader("Content-Type", "text/html");
      response.writeHead(200);
      return response.end(contents);
    })
    .catch((error) => console.error(error));
}
```

Le client ne reçoit aucune réponse car le fichier "index.html" n'existe pas.


### Question 1.4 quelle est l’erreur affichée dans la console ?

L'erreur obtenue dans la console est :

```
Error: ENOENT: no such file or directory, open 'C:\Users\eligr\OneDrive\Bureau\Cours_L7_info\Semestre_4\Web\TP\devweb-tp5\index.html'
    at async open (node:internal/fs/promises:642:25)
    at async Object.readFile (node:internal/fs/promises:1279:14) {
  errno: -4058,
  code: 'ENOENT',
  syscall: 'open',
  path: 'C:\\Users\\eligr\\OneDrive\\Bureau\\Cours_L7_info\\Semestre_4\\Web\\TP\\devweb-tp5\\index.html'
}
```























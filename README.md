# Dev Web - TP5

## Partie 1 : serveur HTTP natif Node.js

### Question 1.1 donner la liste des en-têtes de la réponse HTTP du serveur.


En-têtes de la réponse HTTP du serveur :   
```
  Connection : keep-alive  
  Date : Sun,21 Sep 2025 04:02:54 GMT  
  Keep-alive : timeout = 5  
  Transfer-encoding : chunked
```

### Question 1.2 donner la liste des en-têtes qui ont changé depuis la version précédente.

Après avoir remplacer la fonction ```requestListener()``` par la suivante :

```js
function requestListener(_request, response) {
  response.setHeader("Content-Type", "application/json");
  response.end(JSON.stringify({ message: "I'm OK" }));
}
```

On obtient l'en-têtes de la reponse HTTP du serveur suivante :

```
  Connection : keep-alive
  Content-Length : 20
  Content-Type : application/json
  Date : Sun,21 Sep 2025 04:10:17 GMT  
  Keep-alive : timeout = 5  
 ```

### Question 1.3 que contient la réponse reçue par le client ?

On remplace la fonction ```requestListener()``` par la suivante : 

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
>[!WARNING]  
>Le client ne reçoit aucune réponse car le fichier ```index.html``` n'existe pas.


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

### Question 1.5 donner le code de requestListener() modifié avec gestion d’erreur en async/await.

```js
async function requestListener(_request, response) {
  try {
    const contents = await fs.readFile("index.html", "utf8");
    response.setHeader("Content-Type", "text/html");
    response.writeHead(200);
    response.end(contents);
  } catch (error) {
    console.error(error);
    response.writeHead(500);
    response.end("Error 500: Internal Server Error");
  }
}
```


### Question 1.6 indiquer ce que cette commande a modifié dans votre projet.

```
npm install cross-env --save
npm install nodemon --save-dev
```


* Elles ont ajouté les dépendances cross-env (en production) et nodemon (en développement) dans le fichier package.json

  * cross-env apparaît dans la section "dependencies".
  * nodemon apparaît dans la section "devDependencies".  

* Elles ont créé le fichier package-lock.json pour enregistrer précisément les versions installées et leurs dépendances.  

* Elles ont téléchargé les paquets nécessaires dans le dossier node_modules.


### Question 1.7 quelles sont les différences entre les scripts http-dev et http-prod ?

* http-dev utilise nodemon, qui surveille les fichiers du projet et redémarre automatiquement le serveur à chaque modification. 

* http-prod utilise simplement node pour lancer le serveur, sans surveillance des fichiers : le serveur ne redémarre pas automatiquement si on modifie le code.



### Question 1.8 donner les codes HTTP reçus par votre navigateur pour chacune des quatre pages précédentes.


* http://localhost:8000/index.html : $${\color{green}200}$$
* http://localhost:8000/random.html : $${\color{green}200}$$
* http://localhost:8000/ :  $${\color{red}404}$$
* http://localhost:8000/dont-exist : $${\color{red}404}$$

*****

## Partie 2 : framework Express


### Question 2.1 donner les URL des documentations de chacun des modules installés par la commande précédente.

```
npm install --save express http-errors loglevel morgan
```

* express : https://expressjs.com/fr/
* http-errors : https://www.npmjs.com/package/http-errors
* loglevel : https://www.npmjs.com/package/loglevel
* morgan : https://www.npmjs.com/package/morgan



### Question 2.2 vérifier que les trois routes fonctionnent.

les routes suivantes fonctionnent :

  * http://localhost:8000
  * http://localhost:8000/index.html
  * http://localhost:8000/random/5



### Question 2.3 lister les en-têtes des réponses fournies par Express. Lesquelles sont nouvelles par rapport au serveur HTTP ?

 En-têtes des réponses fournies par Express:

 
http://localhost:8000 :  
```
HTTP/1.1 304 Not Modified
X-Powered-By: Express
Accept-Ranges: bytes
Cache-Control: public, max-age=0
Last-Modified: Sun, 21 Sep 2025 11:29:08 GMT
ETag: W/"0-1996c08edff"
Date: Wed, 24 Sep 2025 04:22:26 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```


http://localhost:8000/index.html :  

```
HTTP/1.1 304 Not Modified
X-Powered-By: Express
Accept-Ranges: bytes
Cache-Control: public, max-age=0
Last-Modified: Sun, 21 Sep 2025 11:29:08 GMT
ETag: W/"0-1996c08edff"
Date: Wed, 24 Sep 2025 04:22:39 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```


http://localhost:8000/random/5 :  

```
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/html; charset=utf-8
Content-Length: 81
ETag: W/"51-FZ+ObVDXah6Dtwd1tJvF96d5m48"
Date: Wed, 24 Sep 2025 04:22:58 GMT
Connection: keep-alive
Keep-Alive: timeout=5
```

En-têtes de réponse ajouté par Express : 

* ```X-Powered-By: Express``` → signature du framework.
* ```ETag``` → pour la validation de cache.
* ```Cache-Control: public, max-age=0 ``` → directives de cache.
* ```Last-Modified ``` → date de modification de la ressource.
* ```Accept-Ranges: bytes``` → permet la gestion de requêtes partielles (utile pour fichiers statiques).


### Question 2.4 quand l’événement listening est-il déclenché ?

On remplace la dernière ligne de ```server-express.mjs``` par les suivantes :


```js
const server = app.listen(port, host);

server.on("listening", () =>
  console.info(
    `HTTP listening on http://${server.address().address}:${server.address().port} with mode '${process.env.NODE_ENV}'`,
  ),
);

console.info(`File ${import.meta.url} executed.`);
```

L’événement listening est déclenché quand le serveur a fini de s’initialiser et commence à écouter les connexions entrantes.



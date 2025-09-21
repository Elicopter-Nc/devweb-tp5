import http from "node:http";
import fs from "node:fs/promises";

const host = "localhost";
const port = 8000;

function requestListener(_request, response) {
  fs.readFile("index.html", "utf8")
    .then((contents) => {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(contents);
    })
    .catch((error) => {
      console.error(error);
      response.writeHead(500);
      response.end( "Error 500: Internal Server Error" );
    });
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
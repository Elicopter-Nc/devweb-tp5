import http from "node:http";
import fs from "node:fs/promises";

const host = "localhost";
const port = 8000;

async function requestListener(request, response) {
  response.setHeader("Content-Type", "text/html");
  const parts = request.url.split("/");
  try {
    switch (parts[1]) {
      case "":
      case "index.html": {
        const contents = await fs.readFile("index.html", "utf8");
        response.writeHead(200);
        return response.end(contents);
      }
      case "random.html": {
        response.writeHead(200);
        return response.end(`<html><p>${Math.floor(100 * Math.random())}</p></html>`);
      }
      case "random": {
        const nb = Number.parseInt(parts[2], 10);
        if (!Number.isNaN(nb) && nb > 0) {
          let html = "<html>";
          for (let i = 0; i < nb; i++) {
            html += `<p>${Math.floor(100 * Math.random())}</p>`;
          }
          html += "</html>";
          response.writeHead(200);
          return response.end(html);
        } else {
          response.writeHead(400);
          return response.end(`<html><p>400: BAD REQUEST</p></html>`);
        }
      }
      default: {
        response.writeHead(404);
        return response.end(`<html><p>404: NOT FOUND</p></html>`);
      }
    }
  } catch (error) {
    console.error(error);
    response.writeHead(500);
    return response.end(`<html><p>500: INTERNAL SERVER ERROR</p></html>`);
  }
}


const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
  console.log("NODE_ENV =", process.env.NODE_ENV);
});

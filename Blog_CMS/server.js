import path from "path";
import fs from "fs";

let currentDir = path.resolve();
let htmlPath = path.join(currentDir, `public/index.html`);

const server = http.createServer((req, res) => {
    fs.createReadStream(htmlPath).pipe(res)
    req.on("data", chunk => {
        console.log(`Received Chunk: ${chunk}`);
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end(chunk);
    })
    req.on("end", () => {
        console.log("Request received fully!");
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("Data received successfully.")
    })
})

server.listen(3001);
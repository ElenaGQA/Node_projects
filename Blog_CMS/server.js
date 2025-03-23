import path from "path";
import fs from "fs";

let mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript"
}

let currentDir = path.resolve();
let htmlPath = path.join(currentDir, `public/index.html`);

const server = http.createServer((req, res) => {
    fileSender(req, res, ()=>{
        fs.createReadStream(htmlPath).pipe(res)
    }) 
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

function fileSender(req, res, next){
    let filePath = path.join(currentDir, `public/${req.url}`);
    fs.promises.access(filePath)
    .then((result)=>{
        fs.createReadStream(filePath).pipe(res)
    })
    .catch(()=> next())
}

server.listen(3001);

// if??? 
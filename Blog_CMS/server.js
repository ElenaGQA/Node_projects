import path from "path";
import fs, { writeFile } from "fs";
import http from "http";
import { ChildProcess } from "child_process";
import { connect } from "http2";

let mimeTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript"
}

let currentDir = path.resolve();
let htmlPath = path.join(currentDir, `public/index.html`);
let postsPath = path.join(currentDir, `posts.json`);

const server = http.createServer((req, res) => {
    if (req.url === "/add-post" && req.method == "POST") {
        let body = "";
        req.on("data", chunk => {
            body += chunk;
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end(chunk);
        })
        req.on("end", () => {
            let { title, content } = JSON.parse(body);
            if (!title || !content) {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("Title or content cannot be empty");
                return;
            }
            addPost(title, content)
                .then(() => {
                    res.writeHead(200, { "Content-Type": "application/json" });
                    res.end("Post is successfully added");
                })
                .catch((err) => {
                    res.writeHead(500, { "Content-Type ": "text/plain" });
                    res.end("Server error");
                })
        })
    }
    else if (req.url === "/posts" && req.method == "GET") {
        viewPost(res);
    }
    else if (req.url.startsWith("/delete") && req.method == "DELETE") {
        const id = new URL(req.url, `http://${req.headers.host}`).searchParams.get("id");

        deletePost(Number(id), res)
            .then(() => {
                res.writeHead(200, { "Content-Type": "text/plain" });
                res.end("Post is successfully deleted");
            })
            .catch((err) => {
                res.writeHead(500, { "Content-Type ": "text/plain" });
                res.end("Server error");
            })
    }
    else {
        fileSender(req, res, () => {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("404 not found");
        })
    }
})

function fileSender(req, res, next) {
    if (req.url === "/") {
        req.url = "/index.html"
    }
    let filePath = path.join(currentDir, `public/${req.url}`);
    let extensionName = path.extname(filePath);
    fs.promises.access(filePath)
        .then((result) => {
            res.writeHead(200, { "Content-Type": mimeTypes[extensionName] });
            fs.createReadStream(filePath).pipe(res);
        })
        .catch(() => next())
}

function addPost(title, content) {
    return fs.promises.readFile(postsPath, "utf8")
        .then((data) => {
            return JSON.parse(data || "[]");
        })
        .catch(() => [])
        .then((posts) => {
            let post = {
                id: Date.now(),
                title: title,
                content: content
            }
            posts.push(post);
            return fs.promises.writeFile(postsPath, JSON.stringify(posts, null, 2));
        })
}

function deletePost(id) {
    return fs.promises.readFile(postsPath, "utf8")
        .then((data) => {
            return JSON.parse(data || "[]");
        })
        .catch(() => [])
        .then((posts) => {
            let updatedPosts = posts.filter((post) => post.id != id);
            return fs.promises.writeFile(postsPath, JSON.stringify(updatedPosts, null, 2));
        })
}

function viewPost(res) {
    return fs.promises.readFile(postsPath, "utf8")
        .then((data) => {
            return JSON.parse(data || "[]");
        })
        .catch(() => [])
        .then((posts) => {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(posts));

        })
        .catch((err) => {
            res.writeHead(500, { "Content-Type ": "text/plain" });
            res.end("Server error");
        })
}

server.listen(3001);


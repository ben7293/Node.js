const http = require('http'); 
const hostname = "localhost";
const port = 3000;

const server = http.createServer(
    (req, res) => {
        //console.log(req);
        const url = req.url;
        if (url == "/translations"){
            //res.end("Ni Hao Shi Jie Laaaa");
            const translations = {1: "One", 2: "Two", 3:"Three"}
            res.setHeader('Content-Type', 'application/json');
            res.write(JSON.stringify(translations));
        }
        res.end("Hello world!");
    }
);

server.listen(port, server, 
    () => {
        console.log(`Server is running at ${hostname}:${port}`);
    }
);

const http = require("http")
const fs = require("fs")
http.createServer((req,res)=>{
    const data=fs.readFileSync("index.html","utf-8");
        res.end(data);
}).listen(3000,"localhost");





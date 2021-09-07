// // console.log('Halo, Kita akan membuat web server');

// const http = require('http');
 
// /**
//  * Logika untuk menangani dan menanggapi request dituliskan pada fungsi ini
//  * 
//  * @param request: objek yang berisikan informasi terkait permintaan
//  * @param response: objek yang digunakan untuk menanggapi permintaan
//  */
// const requestListener = (request, response) => {
//     let resContent;
//     response.setHeader("Content-Type", 'text/html');
//     console.log(request.path);
//     if(request.path === "localhost:5000/surprise-me") {
//         resContent = "<h1>YOU ARE PRANKED !!!</h1>";
//     }
//     else {
//         resContent = "<h1>You are in node js</h1>";
//     }

//     response.statusCode = 200;
//     response.end(resContent);
// };
 
// const PORT = 5000;
// const HOST = "localhost";

// const server = http.createServer(requestListener);
// server.listen(PORT, HOST, () => console.log(`server sedang berjalan pada http://${HOST}:${PORT}`));

const http = require('http');
 
const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'aplication/json');
    response.statusCode = 200;
 
    const { method, url } = request;
 
    // if(method === 'GET') {
    //     response.end('<h1>Hello!</h1>');
    // }
 
    // if(method === 'POST') {
    //     let body = [];

    //     request.on("data", (data) => body.push(data));
    //     request.on("end", () => {
    //         let data = Buffer.concat(body).toString();
    //         data = JSON.parse(data);
    //         response.end(`Hai, ${data.name}!`);
    //     })
    // }

    const res = {message:""};
    if(url === '/') {
        // TODO 2: logika respons bila url bernilai '/'
        if(method === 'GET') {
            res.message = "Ini adalah homepage";
            response.end(JSON.stringify(res));
        } else {
            res.message = `Halaman tidak dapat diakses dengan ${method} request`;
            response.statusCode = 400;
            response.end(JSON.stringify(res));
        }
    } else if(url === '/about') {
        // TODO 3: logika respons bila url bernilai '/about'
        if(method === 'GET') {
            res.message = "Halo! Ini adalah halaman about";
            response.end(JSON.stringify(res));
        } else if(method === 'POST') {
            let body = [];

            request.on("data", (data) => body.push(data));
            request.on("end", () => {
                const data = Buffer.concat(body).toString();
                const {name} = JSON.parse(data);
                res.message = `Halo ${name}! Ini adalah halaman about`;
                response.end(JSON.stringify(res));
            })
        } else {
            res.message = `Halaman tidak dapat diakses dengan ${method} request`;
            response.statusCode = 400;
            response.end(JSON.stringify(res));
        }
        
    } else {
        // TODO 1: logika respons bila url bukan '/' atau '/about'
        res.message = `Halaman tidak dapat diakses dengan ${method} request`;
        response.statusCode = 404;
        response.end(JSON.stringify(res));
    }
 
};
 
const server = http.createServer(requestListener);
 
const port = 5000;
const host = 'localhost';
 
server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});

const routes = [
    {
        method:"GET",
        path:"/",
        handler:(request, h) => "Homepage"
    },
    {
        method:"*", // any
        path:"/",
        handler:(request, h) => "Halaman tidak dapat diakses oleh method tersebut"
    },
    {
        method:"GET",
        path:"/about",
        handler:(request, h) => "About page"
    },
    {
        method:"*", // any
        path:"/about",
        handler:(request, h) => "Halaman tidak dapat diakses oleh method tersebut"
    },
    {
        method:"*", //any
        path:"/{any*}", // any path
        handler:(request, h) => "Halaman tidak ditemukan"
    },
    {
        method:"GET",
        path:"/hello/{name?}", // optional path parameter with '?'
        handler:(request, h) => {
            const {name = "stranger"} = request.params; // object path parameter property coresponds to path parameter name
            const {lang} = request.query; // object query parameter coresponding to key in query parameter example : localhost:5000?name="YoYo"&id=1

            if(lang === "id") {
                return `Hai, ${name}!`;
            }
            return `Hello, ${name}!`;
        }
    },
    {
        method: 'POST',
        path: '/login',
        handler: (request, h) => {
            const { username, password } = request.payload;
            const response = h.response(`Welcome ${username}!`)
            response.type("application/json");
            // console.log(request.payload);
            return response;
        }
    }

];

module.exports = routes;
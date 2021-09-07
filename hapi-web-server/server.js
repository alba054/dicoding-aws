const Hapi = require("@hapi/hapi");
const routes = require("./routes");

// start server at post and host
// asynchronous process
const init = async () => {
    const server = Hapi.server({
        host:"localhost",
        port:5000
    });

    server.route(routes);
    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
}

init();
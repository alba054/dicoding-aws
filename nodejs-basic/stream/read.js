const fs = require("fs");

const readStreamData = fs.createReadStream("./stream/notes.txt", {
    highWaterMark:10
})

readStreamData.on("readable", () => {
    try {
        process.stdout.write(`${readStreamData.read()}`);
        // console.log(readStreamData.read());
    } catch (error) {
        console.log(error);
    }
});

readStreamData.on("end", () => console.log("\ndone"));
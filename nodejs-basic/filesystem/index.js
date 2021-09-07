const displayTextCallback = (error, data) => {
    if(error) {
        console.log(error);
        return;
    }

    console.log(data);
}

const fs = require("fs");
fs.readFile("./filesystem/notes.txt", "UTF-8", displayTextCallback);
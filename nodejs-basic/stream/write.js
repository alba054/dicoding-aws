/**
 * TODO:
 * Buatlah program untuk membaca teks input.txt dan menuliskannya ulang pada berkas output.txt
 * menggunakan teknik readable stream dan writable stream.
 */

const fs = require("fs");
const path = require("path");

// write
const writeStreamData = fs.createWriteStream(path.resolve(__dirname, "output.txt"));

// read
const readStreamData = fs.createReadStream(path.resolve(__dirname, "input.txt"), {highWaterMark:15});

readStreamData.on("readable", () => {
    try {
        // console.log(readStreamData.read().toString());
        // process.stdout.write(`10 bytes : ${readStreamData.read()}\n`);
        writeStreamData.write(`${readStreamData.read()}\n`);
    } catch (error) {
        console.log(error.message);
    }
});

// console.log(readInput);

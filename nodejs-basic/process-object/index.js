const initialMemoryUsage = process.memoryUsage().heapUsed; // TODO 1
const yourName = process.argv[2]; // TODO 2
const environment = process.env.NODE_ENV; // TODO 3
console.log(environment);
const foo = process.env.foo; // property tambahan yang bisa di set ketika script di eksekusi
console.log(foo); // mencetak property tambahan foo pada process.env
for(let i = 0; i <= 10000; i++) {
//    console.log(i + " "); 
// Proses looping ini akan membuat penggunaan memori naik
}

const currentMemoryUsage = process.memoryUsage().heapUsed; // TODO 4
 
console.log(`Hai, ${yourName}`);
console.log(`Mode environment: ${environment}`)
console.log(`Penggunaan memori dari ${initialMemoryUsage} naik ke ${currentMemoryUsage}`);

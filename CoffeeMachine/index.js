/* 
console.log("Menyalakan mesin kopi");
console.log("Menggiling biji kopi");
console.log("Memanaskan air");
console.log("Mencampurkan air dan kopi");
console.log("Menuangkan kopi ke dalam gelas");
console.log("Menuangkan susu ke dalam gelas");
console.log("Kopi Anda sudah siap!");
*/

/*
export : module.exports
import : require
*/
// const importedModule = require("./state");
// const {isMachineReady:myMachine, coffeeStock:myCoffeeStock} = importedModule;
// console.log(`my machine is ${(myMachine ? "ready":"not ready")}`);
// console.log(myCoffeeStock);

// const makeCoffee = (type, miligrams) => {
//     if (myCoffeeStock[type] >= miligrams) {
//         console.log("Kopi berhasil dibuat!");
//     } else {
//         console.log("Biji kopi habis!");
//     }
// }
 
// makeCoffee("robusta", 80);


/*
export : export default n
import : import n from module
*/
// import {isMachineReady, coffeeStock} from "./state.js";
// console.log(`my machine is ${isMachineReady}`);
// console.log(coffeeStock);

// quiz
import Tiger from "./quiz/tiger.js";
import Wolf from "./quiz/wolf.js";

const fight = (tiger, wolf) => {
    if (tiger.strength > wolf.strength) {
      return tiger.growl();
    }
    if (wolf.strength > tiger.strength) {
      return wolf.howl();
    }
    return 'Harimau dan serigala sama-sama kuat!';
  };
  
  const myTiger = new Tiger();
  const myWolf = new Wolf();
  
  const result = fight(myTiger, myWolf);
  console.log(result);
  export {fight, myTiger, myWolf, result};
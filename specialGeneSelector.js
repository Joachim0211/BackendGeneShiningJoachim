//switch;

const basis = "Kdeficiency-top100.json";

//the according file is read into the variable file
const fileA = require("./Mock-data/" + basis);
const fileB = require("./Mock-data/" + basis);
//console.log(file)
let numObj = 0;

for (let i = 0; i < fileA.length; i++) {
  /*for(let i = 0; i < fileB.length; i++){


    }*/

  let obj = fileA[i];
  numObj++;
  //console.log(obj.biofunct);
  //let temp = obj.log2fc * obj.rpkm
}
console.log(numObj);

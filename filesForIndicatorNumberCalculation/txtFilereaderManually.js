const fs = require('fs');


const fileToOrder = require("../Mock-data/Kdefused.json");


function compare(a, b) {
    //console.log('comparing');
  if (Math.abs(a.changeIntensity) > Math.abs(b.changeIntensity)) {
    return -1;
  }
  if (Math.abs(a.changeIntensity) < Math.abs(b.changeIntensity)) {
    return 1;
  }
}

fileToOrder.sort(compare);
console.log(fileToOrder);

const slicedFile = fileToOrder.slice(0, 300);

fs.writeFile('orderedKdefused300.json', JSON.stringify(slicedFile), (err) => {
    if (err) throw err;
    console.log('Data written to file');
});
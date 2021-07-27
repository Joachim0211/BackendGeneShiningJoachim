const fived = "fiveDayKdepl.json";
const twod = "twoDayKdepl.json";
const oned = "oneDayKdepl.json";
const healthy = "healthyPlants.json";
const basis = "Kdeficiency.json";
const indicatorGenes = "Kdeficiency-top100.json"

//an array to specify the file path
const treatments = [basis, healthy, oned, twod, fived];
let numObj = 0;
let potassiumDefIndicatorNumber = 0;

 
 for(let k = 0; k < treatments.length; k++) {
    const fileA = require("./Mock-data/" + treatments[k]);
    const fileB = require("./Mock-data/" + basis);
    inBothCasesSignAlterd = 0;
    
        for(let i = 0; i < fileA.length; i++) {
            let objA = fileA[i];
            
            if(Number(objA.fdr) < 0.05){
                for(let j = 0; j < fileB.length; j++){
                    let objB = fileB[j];
                    if (objA.id === objB.id && objB.fdr < 0.05){
                    inBothCasesSignAlterd++;
                    }
                }
                
                
            }
            //console.log(objA.rpkm);
        }
console.log("In " + treatments[k] + "       " + inBothCasesSignAlterd + "     genes indicate Postassium deficiency");

};
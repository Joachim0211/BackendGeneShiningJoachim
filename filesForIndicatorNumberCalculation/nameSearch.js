const fived = "fiveDayKdepl.json";
const twod = "twoDayKdepl.json";
const oned = "oneDayKdepl.json";
const healthy = "healthyPlants.json";
const basis = "Kdeficiency.json";
const indicatorGenes = "Kdeficiency-top100.json"

//an array to specify the file path
const treatments = [basis, healthy, oned, twod, fived];
const regexK = new RegExp('potassium', "i");
const regexP = new RegExp('Phosphate ');
let numObj = 0;
let potassiumNameIndicatorNumber = 0;
let phosphatNameIndicatorNumber = 0;

 
 for(let k = 0; k < treatments.length; k++) {
    const fileA = require("./Mock-data/" + treatments[k]);
    
    potasmmsiumNameIndicatorNumber = 0;
    phosphatNameIndicatorNumber = 0;

                          
        for(let i = 0; i < fileA.length; i++){
            let objA = fileA[i];
            if(objA.fdr < 0.1 && regexK.test(objA.biofunct)){
                potassiumNameIndicatorNumber++;  
            }  
            
        }
console.log("In " + treatments[k] + "       " + potassiumNameIndicatorNumber + "     genes indicate Postassium deficiency");
//console.log("In " + treatments[k] + "       " + phosphatNameIndicatorNumber + "     genes indicate Phosphat deficiency");
console.log("______________________________________________");
};
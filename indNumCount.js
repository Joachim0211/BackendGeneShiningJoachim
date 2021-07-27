const fived = "fiveDayKdepl.json";
const twod = "twoDayKdepl.json";
const oned = "oneDayKdepl.json";
const healthy = "healthyPlants.json";
const indicatorGenes = "orderedKdefused300.json"
const deficiency = "Kdefused.json";
const regexK = new RegExp('potassium', "i");
const treatments = [healthy, oned, twod, fived];
let indNumT = 300;
let indNumP = 0;
let indNumPC = 0;
let fdrNumT = 0;
let fdrNumP = 0;
let fdrNumPC = 0;
let namNumT = 0;
let namNumP = 0;
let namNumPC = 0;



for(let k = 0; k < treatments.length; k++) {
    const fileA = require("./Mock-data/" + treatments[k]);
    const fileB = require("./Mock-data/" + indicatorGenes);
    const fileC = require("./Mock-data/" + deficiency);   
    let fdrNumT = 0;
    let fdrNumP = 0;
    let namNumT = 0;
    let namNumP = 0;


    fdrNumT+= fileC.filter(element => element.fdr<=0.05).length;
    namNumT+= fileC.filter(element => element.fdr <= 0.1 && regexK.test(element.biofunct)).length;
    namNumP+= fileA.filter(element => element.fdr <= 0.1 && regexK.test(element.biofunct)).length;

    // for(let j = 0; j < fileC.length; j++){
    //     let objC = fileC[j];
    //     if (Number(objC.fdr) <= 0.05){
    //         fdrNumT++;
    //         }
    // } 
    
    

    for(let i = 0; i < fileA.length; i++) {
        let objA = fileA[i];
        if(Number(objA.fdr) <= 0.05){ 
            
            indNumP+= fileB.filter(element => element.id===objA.id).length
          //fdrNumT+= fileA.filter(element => element.fdr<=0.05).length
          //fdrNumP+= fileC.filter(element => element.id===objA.id && element.fdr <= 0.05).length
            for(let j = 0; j < fileC.length; j++){
                let objC = fileC[j];
                
                if (objA.id === objC.id && Number(objC.fdr) <= 0.05){
                fdrNumP++;
                }
            }
            
            
        } 
    }
indNumPC=indNumP*100/indNumT;
fdrNumPC=fdrNumP*100/fdrNumT;
namNumPC=namNumP*100/namNumT;

console.log(namNumT)
console.log(namNumP)
console.log(indNumPC.toFixed(2));
console.log(fdrNumPC.toFixed(2));
console.log(namNumPC.toFixed(2));
console.log("___________________");
};

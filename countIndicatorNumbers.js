const fived = "fiveDayKdepl.json";
const twod = "twoDayKdepl.json";
const oned = "oneDayKdepl.json";
const healthy = "healthyPlants.json";
const indicatorGenes = "orderedKdefused300.json"
const deficiency = "Kdefused.json";
const regexK = new RegExp('potassium', "i");
const regexInf = new RegExp('#0ME?', "i");
const treatments = [healthy, oned];


const countIndicatorNumbers = (pathToJsonFile) => {

    return new Promise((resolve, reject) => {
        try {
            const fileA = require(pathToJsonFile)
            // const fileA = require("./Mock-data/" + treatments[k]);
            const fileB = require("./Mock-data/" + indicatorGenes);
            const fileC = require("./Mock-data/" + deficiency);   
        
            let indNumT = 300;
            let indNumP = 0;
            let indNumPC = 0;
            let fdrNumT = 0;
            let fdrNumP = 0;
            let fdrNumPC = 0;
            let namNumT = 0;
            let namNumP = 0;
            let namNumPC = 0;
            let infNumT = 0;
            let infNumP = 0;
            let infNumPC = 0;
            let highNumPC = 0;
            let timeCounter = 0;
            let diffToDisease=0;
            let candNumTC = 0;
            let candNumTA = 0;
                
                for(let k = 0; k < treatments.length; k++) {
                
                let fdrNumT = 0;
                let fdrNumP = 0;
                let namNumT = 0;
                let namNumP = 0;
                let infNumT = 0;
                let infNumP = 0;
                let highNumT = 0;
                let highNumP = 0;
                let candNumTC = 0;
                let candNumTA = 0;
                let diffToDisease=0;
            
            
                candNumTC += fileC.filter(element => element.fdr<=0.05 && element.rpkm>1 ).length;
                candNumTA += fileA.filter(element => element.fdr<=0.05 && element.rpkm>1).length;
            
                fdrNumT+= fileC.filter(element => element.fdr<=0.05).length;
                namNumT+= fileC.filter(element => element.fdr <= 0.1 && regexK.test(element.biofunct)).length;
                namNumP+= fileA.filter(element => element.fdr <= 0.1 && regexK.test(element.biofunct)).length;
                //infNumT+= fileC.filter(element => element.rpkm >= 1 && regexInf.test(element.log2fc)).length;
                //infNumP+= fileA.filter(element => element.rpkm >= 1 && regexInf.test(element.log2fc)).length;
            
                //caculation of commonly newly expressed genes
                for(let j = 0; j < fileC.length; j++){
                    let objC = fileC[j];
                    
                    if (regexInf.test(objC.log2fc) && objC.rpkm >= 0.3){
                        infNumT++;
                        for(let f = 0; f < fileA.length; f++){
                            let objA = fileA[f];
                            if(regexInf.test(objA.log2fc) && objA.rpkm >= 0.3 && objA.id===objC.id){
                                infNumP++;
                            }
                        }
                    }
                } 
            
                //calculation of commonly highly very highly expressed and upregulated genes
                for(let jj = 0; jj < fileC.length; jj++){
                    let objC = fileC[jj];
                    
                    if (objC.rpkm >=500 && objC.fdr <= 0.1 && Number(objC.log2fc)>0){
                        highNumT++;
                        for(let ff = 0; ff < fileA.length; ff++){
                            let objA = fileA[ff];
                            if(objA.rpkm >=500 && objA.fdr <= 0.1 && Number(objA.log2fc)>0 && objC.id===objA.id){
                                highNumP++;
                                console.log(objA);
                            }
                        }
                    }
                } 
                
                
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
            
                for(let iii = 0; iii < fileA.length; iii++) {
                    let objA = fileA[iii];
                    timeCounter++;
                       for(let jjj = 0; jjj < fileC.length; jjj++){
                            let objC = fileC[jjj];
                            
                            if (objA.id === objC.id && Math.abs(Number(objC.fdr)-Number(objA.fdr)) > 0.4){
                                diffToDisease++;
                            }
                        }
                    } 
                
            
            
            
            indNumPC=indNumP*100/indNumT;
            fdrNumPC=fdrNumP*100/fdrNumT;
            namNumPC=namNumP*100/namNumT;
            infNumPC=infNumP*100/infNumT;
            highNumPC=highNumP*100/highNumT;

            resolve({
                timeCounter,
                diffToDisease,
                candNumTC,
                candNumTA,
                indNumPC: indNumPC.toFixed(2),
                fdrNumPC: fdrNumPC.toFixed(2),
                namNumPC: namNumPC.toFixed(2),
                infNumPC: infNumPC.toFixed(2),
                highNumPC: highNumPC.toFixed(2)
            })
            // console.log(timeCounter);
            // console.log(diffToDisease);
            // console.log(candNumTC);
            // console.log(candNumTA);
            // console.log(indNumPC.toFixed(2));
            // console.log(fdrNumPC.toFixed(2));
            // console.log(namNumPC.toFixed(2));
            // console.log(infNumPC.toFixed(2));
            // console.log(highNumPC.toFixed(2));
            // console.log("___________________");
            };
        } catch (e) {
            reject(e.message)
        }
    })

   
}

module.exports = countIndicatorNumbers







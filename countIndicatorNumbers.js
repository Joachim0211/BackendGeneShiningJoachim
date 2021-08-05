const healthy = "healthyPlants.json";
const indicatorGenes = "orderedKdefused300.json"
const deficiency = "Kdefused.json";
const regexK = new RegExp('potassium', "i");
const regexInf = new RegExp('#0ME?', "i");
const treatments = [healthy]


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
            let timerCounterPC = 0;
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
            let diffToDisease = 0;
            let candNumTC = 0;
            let candNumTA = 0;

            for (let k = 0; k < treatments.length; k++) {

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
                let diffToDisease = 0;
                let timeCounter = 0;


                candNumTC += fileC.filter(element => element.fdr <= 0.05 && element.rpkm > 1).length;
                candNumTA += fileA.filter(element => element.fdr <= 0.05 && element.rpkm > 1).length;

                fdrNumT += fileC.filter(element => element.fdr <= 0.05).length;
                namNumT += fileC.filter(element => element.fdr <= 0.1 && regexK.test(element.biofunct)).length;
                namNumP += fileA.filter(element => element.fdr <= 0.1 && regexK.test(element.biofunct)).length;
                //infNumT+= fileC.filter(element => element.rpkm >= 1 && regexInf.test(element.log2fc)).length;
                //infNumP+= fileA.filter(element => element.rpkm >= 1 && regexInf.test(element.log2fc)).length;

                //caculation of commonly newly expressed genes
                for (let j = 0; j < fileC.length; j++) {
                    let objC = fileC[j];

                    if (regexInf.test(objC.log2fc) && objC.rpkm >= 0.3) {
                        infNumT++;
                        for (let f = 0; f < fileA.length; f++) {
                            let objA = fileA[f];
                            if (regexInf.test(objA.log2fc) && objA.rpkm >= 0.3 && objA.id === objC.id) {
                                infNumP++;
                            }
                        }
                    }
                }

                //calculation of commonly highly very highly expressed and upregulated genes
                for (let jj = 0; jj < fileC.length; jj++) {
                    let objC = fileC[jj];

                    if (objC.rpkm >= 500 && objC.fdr <= 0.1 && Number(objC.log2fc) > 0) {
                        highNumT++;
                        for (let ff = 0; ff < fileA.length; ff++) {
                            let objA = fileA[ff];
                            if (objA.rpkm >= 500 && objA.fdr <= 0.1 && Number(objA.log2fc) > 0 && objC.id === objA.id) {
                                highNumP++;
                                //console.log(objA);
                            }
                        }
                    }
                }


                for (let i = 0; i < fileA.length; i++) {
                    let objA = fileA[i];
                    if (Number(objA.fdr) <= 0.05) {

                        indNumP += fileB.filter(element => element.id === objA.id).length
                        //fdrNumT+= fileA.filter(element => element.fdr<=0.05).length
                        //fdrNumP+= fileC.filter(element => element.id===objA.id && element.fdr <= 0.05).length
                        for (let j = 0; j < fileC.length; j++) {
                            let objC = fileC[j];

                            if (objA.id === objC.id && Number(objC.fdr) <= 0.05) {
                                fdrNumP++;
                            }
                        }
                    }
                }

                for (let iii = 0; iii < fileA.length; iii++) {
                    let objA = fileA[iii];
                    
                    for (let jjj = 0; jjj < fileC.length; jjj++) {
                        let objC = fileC[jjj];

                        if (objA.id === objC.id && Math.abs(Number(objC.fdr) - Number(objA.fdr)) > 0.4) {
                            diffToDisease++;
                        }
                    }
                }

                for (let i = 0; i < fileA.length; i++) {
                    let objA = fileA[i];
                    if (Number(objA.rpkm) >= 1) {
                        timeCounter++;

                    }
                }

                indNumPC = indNumP * 100 / indNumT;
                console.log(indNumPC);
                fdrNumPC = fdrNumP * 100 / fdrNumT;
                namNumPC = namNumP * 100 / namNumT;
                infNumPC = infNumP * 100 / infNumT;
                highNumPC = highNumP * 100 / highNumT;

                let number1 = 0;
                let number2 = 0;
                let number3 = 0;
                let number4 = 0;
                let mainNumber = 0;
                let timeCounterPC = 0;


                //cacluation of iN for commenly significantly changed
                if (indNumPC >= 1 && indNumPC < 2) {
                    number1 = 1;
                }
                if (indNumPC >= 2 && indNumPC < 3) {
                    number1 = 2;
                }
                if (indNumPC >= 3 && indNumPC < 4) {
                    number1 = 3;
                }
                if (indNumPC >= 4 && indNumPC < 5) {
                    number1 = 4;
                }
                if (indNumPC >= 5 && indNumPC < 6) {
                    number1 = 1;
                }
                if (indNumPC >= 6 && indNumPC < 7) {
                    number1 = 1;
                }
                if (indNumPC >= 7 && indNumPC < 8) {
                    number1 = 1;
                }
                if (indNumPC >= 8 && indNumPC < 9) {
                    number1 = 1;
                }
                if (indNumPC >= 9 && indNumPC < 10) {
                    number1 = 1;
                }
                if (indNumPC >= 10) {
                    number1 = 10;
                }

                //cacluation of iN for newly expressed genes
                if (infNumPC >= 1 && infNumPC < 2) {
                    number2 = 1;
                }
                if (infNumPC >= 2 && infNumPC < 3) {
                    number2 = 2;
                }
                if (infNumPC >= 3 && infNumPC < 4) {
                    number2 = 3;
                }
                if (infNumPC >= 4 && infNumPC < 5) {
                    number2 = 4;
                }
                if (infNumPC >= 5 && infNumPC < 6) {
                    number2 = 5;
                }
                if (infNumPC >= 6 && infNumPC < 7) {
                    number2 = 6;
                }
                if (infNumPC >= 7 && infNumPC < 8) {
                    number2 = 7;
                }
                if (infNumPC >= 8 && infNumPC < 9) {
                    number2 = 8;
                }
                if (infNumPC >= 9 && infNumPC < 10) {
                    number2 = 9;
                }
                if (infNumPC >= 10) {
                    number2 = 10;
                }

                //cacluation of iN for common fdr
                if (fdrNumPC >= 1 && fdrNumPC < 2) {
                    number3 = 1;
                }
                if (fdrNumPC >= 2 && fdrNumPC < 3) {
                    number3 = 2;
                }
                if (fdrNumPC >= 3 && fdrNumPC < 4) {
                    number3 = 3;
                }
                if (fdrNumPC >= 4 && fdrNumPC < 5) {
                    number3 = 4;
                }
                if (fdrNumPC >= 5 && fdrNumPC < 6) {
                    number3 = 5;
                }
                if (fdrNumPC >= 6 && fdrNumPC < 7) {
                    number3 = 6;
                }
                if (fdrNumPC >= 7 && fdrNumPC < 8) {
                    number3 = 7;
                }
                if (fdrNumPC >= 8 && fdrNumPC < 9) {
                    number3 = 8;
                }
                if (fdrNumPC >= 9 && fdrNumPC < 10) {
                    number3 = 9;
                }
                if (fdrNumPC >= 10) {
                    number3 = 10;
                }

                //cacluation of iN for name
                if (namNumPC >= 1 && namNumPC < 2) {
                    number4 = 1;
                }
                if (namNumPC >= 2 && namNumPC < 3) {
                    number4 = 2;
                }
                if (namNumPC >= 3 && namNumPC < 4) {
                    number4 = 3;
                }
                if (namNumPC >= 4 && namNumPC < 5) {
                    number4 = 4;
                }
                if (namNumPC >= 5 && namNumPC < 6) {
                    number4 = 5;
                }
                if (namNumPC >= 6 && namNumPC < 7) {
                    number4 = 6;
                }
                if (namNumPC >= 7 && namNumPC < 8) {
                    number4 = 7;
                }
                if (namNumPC >= 8 && namNumPC < 9) {
                    number4 = 8;
                }
                if (namNumPC >= 9 && namNumPC < 10) {
                    number4 = 9;
                }
                if (namNumPC >= 10) {
                    number4 = 10;
                }
                timeCounterPC = timeCounter*100/36768;
                mainNumber = (number1+number1+number1+number2+number2+number2+number2+number2+number3+number4)/10
                
                console.log(diffToDisease);
                console.log(candNumTC);
                console.log(candNumTA);
                console.log(indNumPC.toFixed(2));number4
                console.log(fdrNumPC.toFixed(2));
                console.log(namNumPC.toFixed(2));
                console.log(infNumPC.toFixed(2));
                console.log(number1);
                console.log(number2);
                console.log(number3);
                console.log(number4);
                console.log(mainNumber.toFixed(2))                     

                

                resolve({
                    number1,
                    number2,
                    number3,
                    number4,
                    mainNumber,
                    timeCounterPC: timeCounterPC.toFixed(1),
                    timeCounter: timeCounter.toFixed(0),
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









let numObj = 0;
let Inf = 0;
let counterErrorsToChange = 0;
const basis = "healthyPlants.json";
const fileA = require("../filesForIndicatorNumberCalculation/" + basis);
    

        for(let i = 0; i < fileA.length; i++) {
            let objA = fileA[i];
            numObj++;
            if(objA.log2fc === '#0ME?'){
                counterErrorsToChange++;
                objA.log2fc = 'Inf'
            }
        
            /*if(objA.log2fc === '#0ME?'){
                Object.defineProperty(objA, 'log2fc', {
                    writable: true, 
                  });   
                objA.log2fct = 'Inf'; 
            }*/
            if(objA.log2fc === 'Inf'){
                Inf++;   
            }
            
        }
            
                   
//console.log("In " + treatments[k] + "       " + potassiumDefIndicatorNumber + "     genes indicate Postassium deficiency");
console.log(numObj);
//console.log(Inf);
console.log(counterErrorsToChange);
console.log(Inf);




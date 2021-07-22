const linestream = require("line-stream");
const fs = require("fs");

const readGeneData = (geneDataPath) => {
  return new Promise((resolve, reject) => {
    console.time("read gene data");
    try {
      const result = [];
      const inputFile = fs.createReadStream(geneDataPath);
      const s = linestream();
      s.on("data", (line) => {
        const parts = line.toString().split("\t");

        // Parts are defined as follows:
        // [0] technical id of the gene
        // [1] a verbal expression for the function of the gene
        // [2] the length of the gene in base pairs (of DNA)
        // [3] a number that represents the intensity of expression (activity) of the gene under normal (optimal) conditions
        // [4] a number that indicates the statistical probability that the gene activity is altered in the analysed organism (compared to optimal); 1 = with 100% certainty not different, 0.05 means different with 95% probability. FDR = False discovery rate
        // [5] the extent of the change compared to [3] expressed as base-2 logarithm (convention) log2fc

        let [id, biofunct, length, rpkm, fdr, log2fc] = parts;
        log2fc = log2fc.replace(/[\n\r]+/g, "");
        const lineData = {
          id,
          biofunct,
          length, //: parseInt(length, 10),
          rpkm, //: //parseInt(intensity, 10),
          fdr,
          log2fc, //: Number(),
          changeIntensity: Number(rpkm) * Number(log2fc),
        };
        /*if(fdr<0.05){
          result.push(lineData);
        };*/
        result.push(lineData);
      });
      s.on("finish", () => {
        console.timeEnd("read gene data");
        //result.sort(compare);
        resolve(result);
      });
      inputFile.pipe(s);
    } catch (e) {
      reject(e);
    }
  });
};

/*function compare(a, b) {
  if (Math.abs(a.changeIntensity) > Math.abs(b.changeIntensity)) {
    return -1;
  }
  if (Math.abs(a.changeIntensity) < Math.abs(b.changeIntensity)) {
    return 1;
  }
  // a must be equal to b
  return 0;
}*/

readGeneData("txtFiles/Kdeficiency.txt")
  .then((data) => {
    fs.writeFile(
      "./Mock-data/Kdeficiency.json",
      JSON.stringify(data),
      function (err) {
        if (err) {
          console.log(err);
        }
        console.log(data);
      }
    );

    /*fs.writeFile(
      "./Mock-data/Kdeficiency-top100.json",
      JSON.stringify(data.slice(0, 100)),
      function (err) {
        if (err) {
          console.log(err);
        }
        console.log(data);
      }
    );*/
  })
  .catch((e) => console.log(e.message));

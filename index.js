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
        // [4] a number that indicates the statistical probability that the gene activity is altered in the analysed organism (compared to optimal); 1 = with 100% certainty not different, 0.05 means different with 95% probability.
        // [5] the extent of the change compared to [3] expressed as base-2 logarithm (convention)

        let [id, definition, length, intensity, probability, change] = parts;
        change = change.replace("\r\n", "");
        const lineData = {
          id,
          definition,
          length: parseInt(length, 10),
          intensity: parseInt(intensity, 10),
          probability: parseInt(probability, 10),
          change: parseInt(change, 10),
        };
        result.push(lineData);
      });
      s.on("finish", () => {
        console.timeEnd("read gene data");
        resolve(result);
      });
      inputFile.pipe(s);
    } catch (e) {
      reject(e);
    }
  });
};

readGeneData("./tomatofull.txt")
  .then((data) => console.log(data))
  .catch((e) => console.log(e.message));

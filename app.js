const express = require("express");
const upload = require("./fileUploader");
const { readGeneData, writeGeneData } = require("./geneData");
const countIndicatorNumbers = require('./countIndicatorNumbers')
const cors = require('cors');

const app = express();
app.use(cors())


app.use(express.json());
app.use(express.static(__dirname + "/public"));
app.use("/numbers", require("./routes/numbersRoute"))

app.post(
  "/submit-gene-data",
  upload.single("gene-data"),
  async (req, res, next) => {
    //   {
    //     fieldname: 'gene-data',
    //     originalname: 'twoDayKdepl.txt',
    //     encoding: '7bit',
    //     mimetype: 'text/plain',
    //     destination: '/Users/ben/Documents/dev/wbs/students/GeneShiningJoachim/public/uploads',
    //     filename: 'gene-data-twoDayKdepl.txt-1626942282216.txt',
    //     path: '/Users/ben/Documents/dev/wbs/students/GeneShiningJoachim/public/uploads/gene-data-twoDayKdepl.txt-1626942282216.txt',
    //     size: 3730781
    //   }
    console.log(req.file);
    try {
    const rawJsonData = await readGeneData(req.file.path);
    const pathToJsonFile = await writeGeneData(rawJsonData, req.file);
    const analysisResult = await countIndicatorNumbers(pathToJsonFile)

    console.log(analysisResult);    
    // console.log(rawJsonData);
    res.json(analysisResult);
    } catch (error) {
      console.log({error})
      res.json(error)
    }
    


  }
);

//here the calculated data will be send in a json format, at the moment in the most simple way 
// just one 'potassium number'

app.post("/oaresults", (req, res) => {
  res.json({
    potassiumNumbers: ['number 1', 'number 2'] 
  });
});

app.get("/", (req, res) => {
  console.log(req)
  res.send("<h1>Welcome to GeneShining Backend - where the submited files will be analysed!</h1>");
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

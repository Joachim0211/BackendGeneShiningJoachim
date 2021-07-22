const express = require("express");
const upload = require("./fileUploader");
const { readGeneData, writeGeneData } = require("./geneData");

const app = express();

app.use(express.json());
app.use(express.static(__dirname + "/public"));

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
    const rawJsonData = await readGeneData(req.file.path);
    const pathToJsonFile = await writeGeneData(rawJsonData, req.file);
    console.log(pathToJsonFile);

    // console.log(rawJsonData);
    res.json({
      status: 200,
      message: "success!",
    });
  }
);

app.post("/something", (req, res) => {
  res.send("what");
});

app.get("/", (req, res) => {
  res.send("Gene shining");
});

const port = process.env.PORT || 3002;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

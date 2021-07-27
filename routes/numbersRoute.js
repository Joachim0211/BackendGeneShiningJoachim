const express = require("express");
router = express.Router();
const numbersControllers = require ("../controllers/numberControllers");

router.get("/", numbersControllers.list);

module.exports = router;
const express = require("express");
const router = express.Router();
const main = require("./transfertokens");
router.get("/", (req, res) => {
  res.status(200).json({ message: " Server establlished to connect Binance " });
});

router.get("/transfertokens", async (req, res) => {
  let queryParams = req.query;
  let { to, value } = queryParams;
  if (to && value) {
    let tx = await main(to, value);

    res.status(200).json({
      message: "Transfer Tokens Successfull ...",
      to: to,
      value: value,
      tx
    });
    return;
  }

  res.status(201).json({ message: "Transfer Tokens Unsuccessfull ..." });
});
module.exports = router;

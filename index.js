
const port = 3000;
const express = require("express");
const app = express();
app.use(express.json());

app.use(require("./Routes"));
app.listen(port, () => {
  console.log(`Server is lisening on port ${port}`);
});

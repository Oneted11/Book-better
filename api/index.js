express = require("express");
require("dotenv").config();
const app = express();
const {
    PORT = 3500
} = process.env

app.get("/",(req,res)=>res.send("we are live"));
app.listen(PORT, () => {
  console.log(`the api is running at http://localhost:${PORT}`);
});


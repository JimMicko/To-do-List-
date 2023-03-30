const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use("/route", require("./routes/route"));

app.listen(5000, () => {
    console.log(`server is running`)
});
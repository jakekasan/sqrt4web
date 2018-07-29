const express = require("express");
const app = express();
const Database = require("./models/database");
const router = require("./controllers/routes");
const db = new Database();

app.use(express.static("./public"));

router(app,db);

app.listen(8080, () => {
    console.log("Listening on 8080...")
});
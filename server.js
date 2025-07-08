



const express = require("express");
const path = require("node:path");
const app = express();
const staticAssetSource = path.join(__dirname, "public");
const PORT = 5000;
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(staticAssetSource));
app.use(express.json());
app.use(express.urlencoded({extended : true}));






app.get("/", (req, res)=>{
    
})





app.listen(PORT, ()=>{
    console.log(`Server running at Port ${PORT}`);
})
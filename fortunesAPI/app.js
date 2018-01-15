const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const fortunes = require("./data/fortunes");


const app = express();
app.use(bodyParser.json());

app.get("/fortunes", (req, res) => {
    res.json(fortunes);
    
});

app.get("/fortunes/random", (req, res) => {
    console.log("Requsting random fortune");
    const randomIdx = Math.floor( Math.random() * fortunes.length );
    res.json(fortunes[randomIdx]);
    
});

app.get("/fortunes/:id", (req, res) => {
    res.json( fortunes.find(f => f.id == req.params.id) );
})

app.post("/fortunes", (req, res) =>{
    const {message, luckyNumber, spiritAnimal} = req.body;
    const fortuneIDs = fortunes.map(f => f.id);
    const fortune = {
        id: fortuneIDs.length > 0 ? Math.max(...fortuneIDs) + 1 : 0, 
        message, 
        luckyNumber, 
        spiritAnimal
    };
    fs.writeFile( "./data/fortunes.json", JSON.stringify( fortunes.concat(fortune) ) , err => console.log(err));
});

app.put(("/fortunes/:id"), (req, res) =>{
    const { id } = req.params;
    const oldEntry = fortunes.find(f => f.id == id);

    ["message", "luckyNumber", "spiritAnimal" ].forEach(key => {
        if (req.body[key]){
            oldEntry[key] = req.body[key];
        }
    });

    fs.writeFile("./data/fortunes.json", JSON.stringify(fortunes), err => console.log(err));
}); 

app.delete(("/fortunes/:id"), (req, res) =>{
    const {id} = req.params;
    const newFortunes = fortunes.filter(f => f.id != id);
    fs.writeFile("./data/fortunes.json", JSON.stringify(newFortunes), err => console.log(err));
});

module.exports = app;

let express = require('express');
let bodyParser = require("body-parser");
let path = require('path');


let app = express();
// let PORT = 3000;
let PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Data

let characters = [{
    routeName: "yoda",
    name: "Yoda",
    role: "Jedi Master",
    age: 900,
    forcePoints: 2000
  }, {
    routeName: "darthmaul",
    name: "Darth Maul",
    role: "Sith Lord",
    age: 200,
    forcePoints: 1200
  }, {
    routeName: "obiwankenobi",
    name: "Obi Wan Kenobi",
    role: "Jedi Knight",
    age: 60,
    forcePoints: 1350
  }];

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});

//api route 
app.get('/api/:all', function(req, res){ // /yoda
    return res.json(characters);
});

app.get('/api/characters/:character', function(req, res) {
    let chosen = req.params.character;

    for(let i=0; i < characters.length; i++) {
        if (chosen === characters[i].routeName) {
            return res.json(characters[i]);
        }
    }
    return res.send('no character found');
});

// create new characters
app.post('/api/characters', function(req, res) {
    let newCharacter = req.body;
    characters.push(newCharacter);

    res.json(newCharacter);
})


app.listen(PORT, function() {
    console.log("App listening on PORT" + PORT);
})


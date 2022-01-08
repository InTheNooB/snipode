const path = require('path');
const express = require('express');
const api = require('./api.js');

const port = 3001;
var app = express();


// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/api/getCodeSnippets", (req, res) => {
  res.json({ result: "OK", codeSnippets: api.getCodeSnippets() });
})

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});


let server = app.listen(port, function() {
  console.log("Example app listening at http://localhost:" + port)
});
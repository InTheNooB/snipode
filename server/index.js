const path = require('path');
const express = require('express');
const api = require('./api.js');

const port = 3001;
var app = express();
app.use(express.json());


// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get("/api/getCodeSnippets", (req, res) => {
  let codeSnippets = api.getCodeSnippets();
  if (codeSnippets) {
    res.json({ result: "OK", codeSnippets: api.getCodeSnippets() });
  } else {
    res.json({ result: "KO" });
  }
})

app.post("/api/addCodeSnippet", (req, res) => {
  new Promise((resolve) => {
    if (req.body) {
      let requestStatus = api.addCodeSnippet(req.body);
      if (requestStatus) {
        resolve(api.getCodeSnippets());
      } else {
        resolve(null);
      }
    } else {
      resolve(null);
    }
  }).then((codeSnippets) => {
    if (codeSnippets != null) {
      res.json({ result: "OK", codeSnippets: codeSnippets });
    } else {
      res.json({ result: "KO" });
    }
  });
});


// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});


let server = app.listen(port, function () {
  console.log("Example app listening at http://localhost:" + port)
});
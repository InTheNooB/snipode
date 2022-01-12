// Utils
const path = require('path');
const api = require('./api.js');

// Express / SocketIO
const express = require('express');
const cors = require('cors')
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  }
});
app.use(express.json());
app.use((req, res, next) => {
  res.io = io;
  next();
})
app.use(cors())

// Constant variables
const expressPort = 3001;
const socketIOPort = 3002;

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

// API endpoint : Get the list of code snippets
app.get("/api/getCodeSnippets", (req, res) => {
  let codeSnippets = api.getCodeSnippets();
  if (codeSnippets) {
    res.json({ result: "OK", codeSnippets: codeSnippets });
  } else {
    res.json({ result: "KO" });
  }
})

// API endpoint : Get the list of languages
app.get("/api/getLanguagesList", (req, res) => {
  let languagesList = api.getLanguagesList();
  if (languagesList) {
    res.json({ result: "OK", languagesList: languagesList });
  } else {
    res.json({ result: "KO" });
  }
});

// API endpoint : Add a snippet to the list
app.post("/api/addCodeSnippet", (req, res) => {
  new Promise((resolve) => {
    if (req.body) {
      let newCodeSnippet = api.addCodeSnippet(req.body);
      if (newCodeSnippet) {
        resolve({ codeSnippets: api.getCodeSnippets(), newCodeSnippet: newCodeSnippet });
      } else {
        resolve(null);
      }
    } else {
      resolve(null);
    }
  }).then((json) => {
    if (json != null) {
      res.json({ result: "OK", codeSnippets: json.codeSnippets });
      res.io.emit('newCodeSnippet', json.codeSnippets)
    } else {
      res.json({ result: "KO" });
    }
  });
});


// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

// On new client connection
io.on('connect', (socket) => {
  socket.emit('firstConnection', 'hello');
  socket.on('disconnect', () => { });
});


app.listen(expressPort, function () {
  console.log("Express listening at http://localhost:" + expressPort)
});

server.listen(socketIOPort, () => {
  console.log("Socket.IO listening on port http://localhost:" + socketIOPort)
})
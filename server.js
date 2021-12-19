
const path = require('path');
const express = require('express');
const app = express();

// Serve static files
app.use(express.static('./dist/FrontendConcecionario'));

// Send all requests to index.html
app.get('/*', (req, res) =>{
  res.sendFile('index.html',{root: './dist/FrontendConcecionario'});
});

// default Heroku port
app.listen(process.env.PORT || 4200);
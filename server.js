const cors = require('cors');
const express = require('express');
const app = express();
const path = require('path');
const PORT = 8080;

app.use(cors())
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/*', (req, res, next) => res.sendFile(path.join(__dirname, '/public/index.html')));
app.listen(PORT, () => {console.log('Running at ' + PORT )});
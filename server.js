const express = require('express')
const server = express()
const path = require('path');



server.use(express.static(path.join(__dirname, 'build')));

server.get('*', (req, res) => res.sendFile(path.resolve( 'build', 'index.html')));

const port = process.env.PORT || 80;

server.listen(port)
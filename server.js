const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser'),
    morgan = require('morgan'),
    path = require('path'),
    valueStream = require('./value-stream-total-time'),
    valueStreamStatus = require('./value-stream-status'),
    packageInfo = require('./package.json'),
    config = require('./config'),
    _ = require('lodash'),
    argv = require('yargs').argv;

let port = argv.port || 3003;

const proxy = require('http-proxy-middleware');

// let token = null;
app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json({ limit: '100mb' }));

//back end logic
app.post('/value-stream',valueStream.calculateTime);

app.post('/value-stream-status',valueStreamStatus.calculateStatus);

// app.get('/test', (req, res) => {
//     res.send("hh");
//     return res;
// })

console.log(`${packageInfo.name} ${packageInfo.version} : express starting at ${port}`);
app.listen(port);
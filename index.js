let express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    path = require('path'),
    valueStream = require('./value-stream.js'),
    packageInfo = require('./package.json'),
    argv = require('yargs').argv;

let port = argv.port || 33117;
console.log('node version:',process.version);
let app = express();

app.use(accessControl.policy);
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 'extended': 'true' }));
app.use(bodyParser.json({ limit: '100mb' }));

app.use('/public',
    express.static(path.join(__dirname, 'public'),
        {
            maxAge: '2h'
        }));

//back end logic
app.post('/value-stream',valueStream.merge);



console.log(`${packageInfo.name} ${packageInfo.version} starting at ${port}`);
app.listen(port);
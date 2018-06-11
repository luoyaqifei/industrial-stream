const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser'),
    morgan = require('morgan'),
    path = require('path'),
    valueStream = require('./value-stream.js'),
    packageInfo = require('./package.json'),
    argv = require('yargs').argv;
// import {fetchToken, isTokenExpired} from "./tools/tokenTool";
import config from './config';
import * as _ from 'lodash';

let port = argv.port || 3003;

const path = require('path');
const proxy = require('http-proxy-middleware');
// const activityCodeJson = require(path.join(__dirname, 'ActivityCode.json'));

// const sendTokenParams = {
//   'NameIdentifier': 'haha',
//   'unique_name': 'haha',
//   'grant_type': 'password'
// };

// let token = null;
app.use(morgan('dev'));
app.use(cors());

// app.get('/activity-code', (req, res) => {
//   let catalogId = req.query.catalog_uid;
//   let item = _.find(activityCodeJson.codes, i => i.catalog_uid === catalogId);
//   if (!_.isNil(item)) {
//     res.send(item.name);
//   }
//   else {
//     res.send(null);
//   }
// });

// app.get('/token', (req, res) => {
//   if (!token || isTokenExpired(token)) {
//     Promise.resolve(fetchToken(sendTokenParams))
//       .then((data) => {
//         token = data;
//         res.send(data);
//       });
//     return res;
//   }
//   else {
//     res.send(token);
//     return res;
//   }
// });

// app.use('/api', proxy(
//   {
//     target: `http://localhost:${config.plannerPort}/aiplanner`,
//     changeOrigin: true
//   }
// ));

// app.use('/public',
//     express.static(path.join(__dirname, 'public'),
//         {
//             maxAge: '2h'
//         }));

//back end logic
app.post('/value-stream',valueStream.merge);



console.log(`${packageInfo.name} ${packageInfo.version} : express starting at ${port}`);
app.listen(port);
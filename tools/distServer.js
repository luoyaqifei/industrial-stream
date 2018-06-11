// production build

import {chalkProcessing} from './chalkConfig';
import history from 'connect-history-api-fallback';
/* eslint-disable no-console */

console.log(chalkProcessing('Opening production build...'));

const express = require('express');
const app = express();
// app.use(cors());
app.use(history());
const options = {};
app.use(express.static('dist', options));

app.listen(3000, () => {
  console.log('Express dist host is running');
});


require('dotenv').config();
require('./db/mongoose');
const express = require('express');
import api from 'api/v1';
import path from 'path';

const app = express();

app.use('/', api);
app.use('/public', express.static(path.join(__dirname, 'resources')));

app.disable('x-powered-by');

app.listen(process.env.PORT, async (): Promise<void> => {
    console.info('*************** Environment: ' + process.env.NODE_ENV + ' ********************');
    console.info(`Server is running on port ${process.env.PORT}`);
});
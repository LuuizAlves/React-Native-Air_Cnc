const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const routes = require('./routes');

const app = express();

mongoose.connect('mongodb://luizf:lfda2020@arcnc-shard-00-00-c1m0w.mongodb.net:27017,arcnc-shard-00-01-c1m0w.mongodb.net:27017,arcnc-shard-00-02-c1m0w.mongodb.net:27017/omnistack?ssl=true&replicaSet=arcnc-shard-0&authSource=admin&retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

app.listen('3333');
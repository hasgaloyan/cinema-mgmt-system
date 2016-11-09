const express = require('express');
const app = express();

app.use(express.static('public'));

const api = require('./controllers/api');

api.handle(app);

app.listen(3000, () => {
    console.log('Server has started at 3000 port.');
});
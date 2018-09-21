const express = require('express');
const path = require('path');
const app = express();

app.get('/', function (req, res) {
    res.sendFile('index.html', { root: __dirname })
});

app.use('/js', express.static('js'));
app.use(express.static(path.join(__dirname, 'public')));
app.listen(3000);
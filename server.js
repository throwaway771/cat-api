const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Database connection ok");    
}).catch(err => {
    console.log('Database connection failed', err);
    process.exit();
});

app.get('/', (req, res) => {
    res.json({"message": "Hello CatApi!"});
});

require('./api/route/routes.js')(app);

app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

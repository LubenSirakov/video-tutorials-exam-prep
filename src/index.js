const express = require('express');
const { PORT } = require('./constants.js');
const routes = require('./routes.js');
const { initDatabase } = require('./config/databaseConfig.js');

const app = express();

app.use(routes);

initDatabase()
    .then(() => {
        app.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}/`));
    })
    .catch(err => {
        console.log('Oh, no! Cannot connect to database: ', err);
    });
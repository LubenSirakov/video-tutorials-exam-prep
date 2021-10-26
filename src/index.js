const express = require('express');
const { PORT } = require('./constants.js');
const routes = require('./routes.js');
const { initDb } = require('./config/databaseConfig.js');

const app = express();

require('./config/expressConfig.js')(app);
require('./config/hbsConfig.js')(app);

app.use(routes);

initDb()
    .then(() => {
        app.listen(PORT, () => console.log(`App is running on http://localhost:${PORT}/`));
    })
    .catch(err => {
        console.log('Oh, no! Cannot connect to database: ', err);
    });
const express = require('express');
const morgan = require('morgan');

const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger.js');

const movies = require('./router/movies');
const users = require('./router/users');
const auth = require('./router/auth');

const app = express();

app.use(express.json());
app.use(morgan('tiny'));

app.use(movies);
app.use(users);
app.use(auth);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use((req, res) => {
    res.status(404).send('404 Not Found');
});

const port = 3000;

app.listen(port, () => {
    console.log(`Server listening on ${port}...`);
});
const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const path = require('path');
const { log } = require('console');
const ownersRouter = require('./routes/ownersRoute');
const productsRouter = require('./routes/productsRoute');
const usersRouter = require('./routes/usersRoute');
const db= require('./config/mongoose-connection');

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

app.use('/owners', ownersRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);

app.listen(3000, () => {
    log('Server is running on http://localhost:3000');
});
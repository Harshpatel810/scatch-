const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
const path = require('path');
const { log } = require('console');
const expressSession = require('express-session');
const flash = require('connect-flash');
const ownersRouter = require('./routes/ownersRoute');
const productsRouter = require('./routes/productsRoute');
const usersRouter = require('./routes/usersRoute');
const index = require('./routes/index');
const db= require('./config/mongoose-connection');
const dotenv = require('dotenv');
dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false } ,
        secret: process.env.SESSION_SECRET || "mysupersecretkey",
    })
);
app.use(flash());    

app.use('/',index)
app.use('/owners', ownersRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);


app.listen(3000, () => {
    log('Server is running on http://localhost:3000');
});
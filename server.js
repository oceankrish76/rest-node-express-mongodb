if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const morgan = require("morgan")
const path = require('path');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override')

const initializePassport = require('./passport-config')
// const port = process.env.PORT || 5000

// function to find user based on the email
initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

const users = []; // not in production level. Use db for that
//database connection
require("./mongo")


//Models
require("./model/Customer");
require("./model/Person");


//Middleware
// parse application/json
app.use(bodyParser.json("combined")).use(morgan("combined"));


// app.set('views', path.join(__dirname, 'views'));
app.use(express.static(__dirname + '/public'));
app.set('views', './views');
// app.set('view engine', 'pug');
app.set('view engine', 'ejs');
// parse application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: false
}))
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

app.get('/', checkAuthenticated, (req, res) => {
    res.render('index.ejs', {
        name: req.user.name
    })
})

app.get('/login', checkNotAuthenticated, (req, res) => {
    res.render('login.ejs')
})

app.post('/login', checkNotAuthenticated, passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

app.get('/register', checkNotAuthenticated, (req, res) => {
    res.render('register.ejs')
})

app.post('/register', checkNotAuthenticated, async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/login')
    } catch {
        res.redirect('/register')
    }
})

app.delete('/logout', (req, res) => {
    req.logOut()
    res.redirect('/login')
})

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}


/* For User done*/
// routes
app.use("/customers", require("./routes/customers"))

app.use("/customers/:customerId/persons/", require("./routes/persons"))
app.listen(process.env.PORT || 5000, function () {
    console.log("Server is running on port 3001");
})
// Check all registered routes
const routes = [];
app._router.stack.forEach(middleware => {
    if (middleware.route) {
        routes.push(`${Object.keys(middleware.route.methods)} -> ${middleware.route.path}`);
    }
});
console.log(JSON.stringify(routes, null, 2));

module.exports = app;
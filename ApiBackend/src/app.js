const express = require("express");
require("./db/User")
const app = express();
app.use(express.json())
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const session = require("express-session");

const cors = require('cors');

app.use(cors({ origin: 'http://localhost:4200' }));

const port = process.env.PORT || 3000;

// BodyParser Middleware
app.use(bodyParser.json());
// Passport Middleware

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({secret: "secret"}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    return res.json({
        message: "This is node.js role based authentication system"
    }); 
});

// Create a custom middleware function
const checkUserType = function (req, res, next) {
    const userType = req.originalUrl.split('/')[2];
    // Bring in the passport authentication starategy
    require('./db/passport')(userType, passport);
    next();
};

app.use(checkUserType);

// Bring in the user routes
const users = require('./routers/userregister');
app.use('/api/users', users);

const admin = require('./routers/admin');
app.use('/api/admin', admin);

app.listen(port,() => {
       console.log(`Connection is live at port no.${port}`);
})

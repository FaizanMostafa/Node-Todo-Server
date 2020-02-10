require('./config');
const express = require('express');
const bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');
var passportConfig = require('./config/passport');
var { ensureAuth } = require('./config/auth');
const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task');
const port = 3000;


const app = express();

// Setting static files directory for serving static files
app.use(express.static('static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


// Passport Session Authentication Related Middleware
passportConfig(passport);
app.use(session({
  secret: 'secretkey',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());


// App Routes
app.use('/user', userRoutes);
app.use('/tasks', ensureAuth, taskRoutes);
app.get('/', (req, resp) => {
  resp.send("Hello World");
});


app.listen(port, ()=>console.log(`Server is up and running at localhost:${port}`))
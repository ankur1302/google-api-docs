require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const compression = require('compression');
const requestIp = require('request-ip');
const helmet = require('helmet');
const passport = require('passport');
const path = require('path');
const mongoose = require('./lib/mongoose');

const app = express();

app.use(helmet());
app.use(passport.initialize());
passport.serializeUser((user, done) => {
  done(null, user);
});

app.set('views', path.join(__dirname, '/views'));

passport.deserializeUser((user, done) => {
  done(null, user);
});
// connect with mongoDB via mongoose ORM
mongoose.connect();

app.use(compression({
  level: 6, // default compression
}));
app.use(bodyParser.json({ limit: '10mb', extended: true }));
app.use(cors());

// attach IP address in header field to catch IP of each request
app.use((req, res, next) => {
  req.headers.ip = requestIp.getClientIp(req);
  next();
});

app.use(express.static('public'));

app.set('view engine', 'ejs');

// manage console logs: to print the logs and error on console
require('./lib/logger/console')(app);
require('./lib/auth/passport');
require('./routes')(app);

// log every errors into the logs/error.log file via winston error logger
// require("./lib/logger/error")(app);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

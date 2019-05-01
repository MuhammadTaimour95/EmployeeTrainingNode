const express = require('express');
const path =  require('path');
const bodyParser =  require('body-Parser');
const passport =  require('passport');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const users = require('./routes/users');
const config = require('./config/database');

// Connect To Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database '+config.database);
  });

 // On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error: '+err);
  }); 

app.get('/', (req, res) => {
    res.send('Invalid Endpoint');
  });
// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));


// Body Parser Middleware
app.use(bodyParser.json());
  
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


app.use('/users', users);
const port = 3800;

app.listen(port , () =>{
    console.log("Server is Running on port " + port);
});
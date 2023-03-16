const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireToken } = require('./authmiddleware/authmiddleware');

const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
// view engine
app.set('view engine', 'ejs');

// database connection
mongoose.set('strictQuery',true);

mongoose.connect('mongodb://127.0.0.1:27017/auth', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3500, (err) => {
        if(err) throw err
        console.log('app running on port 3000..');
  }))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies',requireToken, (req, res) => res.render('smoothies'));
app.use(authRoutes);
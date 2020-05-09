const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

// using KNEX to connect to Database
const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'artd',
      password : '',
      database : 'smartbrain'
    }
  });
// 

const app = express();
app.use(express.json());
app.use(cors());

// For database users
app.get('/', (req, res) => { res.send(database.users) });
// For signin user
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt) });
// For register user
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) });
// For profile.id
app.get('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) });
// For image count
app.put('/image', (req, res) => { image.handleImage(req, res, db) });
// To secure API key
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)});

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`)
});


/* ROUTES
/ root - res = this is working
/ signin - POST = success/fail
/ register - POST = user
/ profile/:userId - GET = user
/ image - PUT = user count ranking
*/

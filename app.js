const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const randToken = require("rand-token")
const mongoose = require('mongoose');
const User = require("./models/User")
mongoose.Promise = require('bluebird');
const databaseURL = process.env.DATABASE || 'mongodb://localhost:27017/giffy'
mongoose.connect(databaseURL);

const port = process.env.PORT || 5000
app.listen( port, () => {
  console.log(`listening on ${port}`)
})

app.use(bodyParser.json())

app.post("/api/auth", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({username: username, password: password})
  .then( user => {
    if (user){
      res.json({
        username: user.username,
        token: user.token
      })
    } else {
      res.status(422).json({
        errors: ["There was a problem with your username or password"]
      })
    }
  })
})

app.post("/api/registration", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = new User({})
  user.username = username;
  user.password = password;
  user.token = randToken.generate(16);
  user.save()
  .then( user => {
    res.status(201).json({
      username: user.username,
      token: user.token
    })
  })
  .catch( (e) => {
    console.log(e)

    if (e.code === 11000){
      res.status(422).json({
        errors: ["The username already exists"]
      })
    } else {
      let errors = []
      if (e.errors.username) {
        errors.push("Username is required")
      }
      if (e.errors.password){
        errors.push("There was a problem with your password")
      }
      res.status(422).json({
        errors: errors
      })
    }


  })
})

app.get("/api/me", (req, res) => {
  let token = req.headers.authorization
  if (token){
    token = token.replace("Bearer ", "");
  }

  User.findOne({token: token})
  .then( user => {
    if (user){
      res.json({
        username: user.username,
        token: user.token
      })
    } else {
      res.status(401).json({
        errors: [
          "Missing or Invalid Token"
        ]
      })
    }
  })
})

// send in a "Authorization: Bearer $TOKEN"
// without, you'll get a 401
// Only endpoints without the 401: registration / auth

// GET https://api.giffy.com/api/me -> "Information about me"
// GET https://api.giffy.com/api/me/gifs -> "My Gifs"
// GET https://api.giffy.com/api/gifs -> "All Gifs"
//
// POST https://api.giffy.com/api/registration -> "create a user"
// POST https://api.giffy.com/api/auth -> "give you a token if you give me username/password"
// POST https://api.giffy.com/api/gifs -> "create a gif"

const express = require("express")
const app = express()

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const databaseURL = process.env.DATABASE || 'mongodb://localhost:27017/giffy'
mongoose.connect(databaseURL);

const port = process.env.PORT || 5000
app.listen( port, () => {
  console.log(`listening on ${port}`)
})

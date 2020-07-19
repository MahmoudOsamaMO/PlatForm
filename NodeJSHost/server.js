const express = require('express');
const bodyParser= require('body-parser')
const mongoose = require('mongoose');
const connectionString = "mongodb+srv://sa:P@ssw0rd@cluster0.39cih.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(connectionString, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', connectionString);
  var quotesCollection  = db.collection('quotes');
  app.post('/quotes', (req, res) => {
    console.log(req.body)
    quotesCollection.insertOne(req.body)
    .then(result => {
      console.log(result)
      res.redirect('/')

    })
    .catch(error => console.error(error))

  })

})

db.on('error', err => {
  console.error('connection error:', connectionString)
})

const app = express();

app.listen(3000, function() {
    console.log('listening on 3000')
  })

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
    // Note: __dirname is directory current directory you're in. Try logging it and see what you get!
    // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
    db.collection('quotes').find().toArray()
    .then(results => {
      console.log(results)
    })
    .catch(error => console.error(error))
  })
  app.use(bodyParser.urlencoded({ extended: true }))
  


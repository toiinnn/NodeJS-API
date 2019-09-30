const express       = require('express')
const MongoClient   = require('mongodb').MongoClient;
const bodyParser    = require('body-parser')
const app           = express()
const db            = require('./config/db')

const port = 8000

app.use(bodyParser.urlencoded({ extended: true}))

// The current mongodb used for this aplication is 2.2.12 or later
MongoClient.connect(db.url, (err, database) => {    
    if (err) {
        return console.log(err)
    } else {
        console.log("Connect success!")
    }

    require('./app/routes') (app, database);
        app.listen(port, () => {
        console.log("We are live on " + port)        
    })
})

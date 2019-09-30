var ObjectID = require('mongodb').ObjectID

module.exports = function(app, db) {

    // Read
    app.get('/notes/:id', (req, res) => {
        const id = req.params.id 
        const details = {'_id': new ObjectID(id)};
        db.collection('notes').findOne(details, ( err, item) => {
            if (err) {
                res.send({ 'error' : "An erro has occurred " + err});
            } else {
                res.send(item)
            }
        })
    })

    // Delete
    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id 
        const details = {'_id': new ObjectID(id)};
        db.collection('notes').remove(details, ( err, item) => {
            if (err) {
                res.send({ 'error' : "An erro has occurred " + err});
            } else {
                res.send('Note ' + id + ' deleted!')
            }
        })
    })

    // Update
    app.put('/notes/:id', (req, res) => {
        const id = req.params.id 
        const details = {'_id': new ObjectID(id)};
        const note = { name: req.body.name, age: req.body.age, email: req.body.email};
        db.collection('notes').update(details, note, ( err, item) => {
            if (err) {
                res.send({ 'error' : "An erro has occurred " + err});
            } else {
                res.send('Note ' + id + ' update!')
            }
        })
    })

    // Create
    app.post('/notes', (req, res) => {
        const note = { name: req.body.name, age: req.body.age, email: req.body.email};
        db.collection("notes").insertOne(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred ' + err })
            } else {
                res.send(result.ops[0])                
            }
        })
     });
};

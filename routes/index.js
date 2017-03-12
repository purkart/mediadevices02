var express = require('express');
var router = express.Router();
var mongo = require('../db/mongoDriver');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Fingerprint Evaluation'});
});

// Extension for 'Projektarbeit SS2016' - start
router.post('/identify', function (req, res) {

    if (req.cookies.fingerprint == null || req.cookies.fingerprint == undefined) {
        console.log('set fingerprint: ' + req.body.fingerprint.hash);
        res.cookie('fingerprint', req.body.fingerprint.hash);
    } else {
        console.log('Calculated fingerprint: ' + req.body.fingerprint.hash);
        console.log('old fingerprint: ' + req.cookies.fingerprint);

        //storing the calculated fingerprint on the client
        res.cookie('fingerprint', req.body.fingerprint.hash);
    }
    //res.render('index');

    console.log('set fingerprint: ' + req.body.fingerprint.hash);
    console.log('adsfasdfasdf: ' + req.body.fingerprint.components);

    console.log('sesssion: ' + req.sessionID);

//lets require/import the mongodb native drivers.
    var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
    var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
    var url = 'mongodb://localhost:27017/test';
    MongoClient.connect(url, function (err, db) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            //HURRAY!! We are connected. :)
            console.log('Connection established to', url);

            // do some work here with the database.

            // Get the documents collection
            var collection = db.collection('users');

            //Create some users
            var user = {
                session: req.sessionID,
                fingerprint: req.body.fingerprint
            };

            // Insert some users
            collection.insert([user], function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
                }
                //Close connection
                db.close();
            });

            //Close connection
            db.close();
        }
    });
});
// Extension for 'Projektarbeit SS2016' - end

module.exports = router;

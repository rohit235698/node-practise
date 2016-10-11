const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const morgan = require('morgan'); 
const url = 'mongodb://127.0.0.1:27017/mongodb';
const MongoClient = require('mongodb').MongoClient
const cors = require('cors');
var db ;

app.listen(3000,function() {

console.log('server listening at 3000');

});

app.use(bodyParser.urlencoded({extended: true}))
app.use(morgan('dev'))


app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

var Review = mongoose.model('Review', {
    title: String,
    description: String,
    rating: Number
});



app.get('/api/reviews', (req, res) => {
 
        console.log("fetching reviews");
 
        // use mongoose to get all reviews in the database
        db.collection('reviews').find(function(err, reviews) {
 
            // if there is an error retrieving, send the error. nothing after res.send(err) will execute
            if (err)
                res.send(err)
 
            res.json(reviews); // return all reviews in JSON format
        });
    });


app.post('/api/reviews', function(req, res) {
 
        console.log("creating review");
 
        // create a review, information comes from AJAX request from Ionic





        db.collection('login').save(req.body, (err, result) => {
    if (err) 
   return console.log(err)
    console.log('saved to database')
    res.json(reviews);
  })


        
        Review.create({
            title : req.body.title,
            description : req.body.description,
            rating: req.body.rating,
            done : false
        }, function(err, review) {
            if (err)
                res.send(err);
 
            // get and return all the reviews after you create another
            Review.find(function(err, reviews) {
                if (err)
                    res.send(err)
                res.json(reviews);
            });
        });
 
    });



// Connection URL
// Use connect method to connect to the Server
MongoClient.connect(url, function(err, database) {
  console.log("Connected correctly to server");
  db = database
});


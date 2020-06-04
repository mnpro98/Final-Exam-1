const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const {ErrHandler} = require( './middleware/errorHandler.js');
const {Actors} = require('./models/actor-model.js');
const {Movies} = require('./models/movie-model.js');
const mongoose = require( 'mongoose' );
const jsonParser = bodyParser.json();
const { DATABASE_URL, PORT } = require( './config' );

const app = express();

app.patch('/api/add-movie-actor/:movie_ID', jsonParser, (req, res) => {
    let id = req.params.movie_ID;

    let idr = req.body.id;


    let fname = req.body.firstName;
    let lname = req.body.lastName;

    let actorFound;

    Actors
        .getActorByName(fname)
        .then(result => {
            if(result != ""){
                actorFound = result;
            } else {
                // actor not found
            }
        })
        .catch(err => {
            res.statusMessage = "Something went wrong with the DB";
            return res.status(500).end();
        });

    Movies
        .getMovieById(idr)
        .then(result => {
            if(result == ""){
                // not found
            }
        })
        .catch(err => {
            res.statusMessage = "Something went wrong with the DB";
            return res.status(500).end();
        });

    Movies
        .addActorToMovieList( actorFound, idr )
        .then(result => {
            return res.status(201).json(result);
        })
        .catch(err => {
            res.statusMessage = "Something went wrong with the DB";
            return res.status(500).end();
        });

});

app.listen( PORT, () => {
    console.log( "This server is running on port 8080" );
    new Promise( ( resolve, reject ) => {
        const settings = {
            useNewUrlParser: true, 
            useUnifiedTopology: true, 
            useCreateIndex: true
        };
        mongoose.connect( DATABASE_URL, settings, ( err ) => {
            if( err ){
                return reject( err );
            }
            else{
                console.log( "Database connected successfully." );
                return resolve();
            }
        })
    })
    .catch( err => {
        console.log( err );
    });
});
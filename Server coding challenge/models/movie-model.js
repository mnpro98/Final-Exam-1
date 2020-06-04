const mongoose = require( 'mongoose' );

const moviesSchema = mongoose.Schema({
    movie_ID : {
        type : Number,
        unique : true,
        required : true
    },
    movie_title : {
        type : String,
        required : true
    },
    year :  {
        type : Number,
        required : true
    },
    rating : {
        type : Number,
        required : true
    },
    actors : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'actors',
        required : true
    }]
});

const moviesCollection = mongoose.model( 'movies', moviesSchema );

const Movies = {
    createMovie : function( newMovie ){
        return moviesCollection
                .create( newMovie )
                .then( createdMovie => {
                    return createdMovie;
                })
                .catch( err => {
                    return err;
                });
    },
    getMovieById : function( movieId ){
        return moviesCollection
            .findOne({movie_ID : movieId})
            .then( foundMovie => {
                return foundMovie;
            })
            .catch( err => {
                return err;
            })
    },
    addActorToMovieList : function( newActor, movieId ){
        return moviesCollection
            .updateOne({movie_ID : movieId}, {$push : {actors : newActor}})
            .then(updatedMovie => {
                return updatedMovie;
            })
            .catch(err => {
                return err;
            });
    }
}

module.exports = {
    Movies
};


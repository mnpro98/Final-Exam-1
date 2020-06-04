const mongoose = require( 'mongoose' );

const actorsSchema = mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type : String,
        required : true
    },
    actor_ID : {
        type : Number,
        unique : true,
        required : true
    }
});

const actorsCollection = mongoose.model( 'actors', actorsSchema );

const Actors = {
    createActor : function( newActor ){
        return actorsCollection
                .create( newActor )
                .then( createdActor => {
                    return createdActor;
                })
                .catch( err => {
                    return err;
                });
    },
    getActorByName : function( actorName ){
        return actorsCollection
            .findOne( {firstName: actorName})
            .then( foundActor => {
                return foundActor;
            })
            .catch( err => {
                return err;
            });
    },
}

module.exports = {
    Actors
};


function errorHandler(error, req, res) {
    if(error == 'MissingId'){
    	res.statusMessage = "Id is missing in the body of the request";
    	return res.status(406);
    } else if(error == 'MovieIdsNotMatch'){
    	res.statusMessage = "id and movie_ID do not match";
    	return res.status(409);
    } else if(error == 'NameMissing'){
    	res.statusMessage = "You need to send both firstName and lastName of the actor to add to the movie list";
    	return res.status(403);
    } else if(error == 'ActorMovieNotExist'){
    	res.statusMessage = "The actor or movie do not exist";
    	return res.status(404);
    }
}

module.exports = errorHandler;
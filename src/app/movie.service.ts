import { Injectable } from '@angular/core';
import { Movie } from './movie';
import { MOVIESLIST } from './movieslist';




@Injectable()
export class MovieService {

  constructor() { }

  loadAllMovies():Movie[]{
  	return MOVIESLIST;
  }



	sortMoviesBy(movies:Movie[],sortOrder:string):Movie[] {
     switch (sortOrder) {
     	case "old":
   		{
   			return movies.sort((movie1,movie2) => movie1.title_year-movie2.title_year );
   		}
     	case "new":
     	{
     		return movies.sort((movie1,movie2) => movie2.title_year-movie1.title_year );
     	}
     	default:
     	return MOVIESLIST;
     }
		
	}

	searchFor(movies:Movie[],movieName:string):Movie[]
	{
		console.log('In Service Search for ' + movieName);
			return movies.filter(movie => movie.movie_title === movieName);
	}
}

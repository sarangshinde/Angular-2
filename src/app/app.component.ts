import { Component,ViewChild,OnInit} from '@angular/core';
import { Movie } from './movie';
import { MOVIESLIST} from './movieslist';
import { MovieService } from './movie.service';
import { co } from 'co';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers:[MovieService],
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
/*   @ViewChild(sortby)*/ sortBy: string;
  title = 'Movies Site';
  totalLikes=0;
  movies:Movie[];
  orignalMoives:Movie[];
  request:any;
  db:IDBDatabase;
  

  constructor(private movieservice:MovieService){
          this.request = window.indexedDB.open("moviesNDB", 3);

            //let db;
            let appcomp=this;
              
                    this.request.onerror = function(event){
                        console.log("Error opening DB", event);
                    }
                    this.request.onupgradeneeded   = function(event){
                        console.log("Upgrading");
                        appcomp.db = event.target.result;
                        console.log('DB IS :' + this.db);
                        let objectStore = this.db.createObjectStore("moviesNDB", { keyPath : "name" });
                    };
                    this.request.onsuccess  = function(event){
                        console.log("Success opening DB");
                          appcomp.db = event.target.result;
/*                          let objectStore = this.db.createObjectStore("moviesNDB", { keyPath : "name" });
                          console.log(objectStore);*/
                          console.log(appcomp);
                         console.log('DB IS :' + appcomp.db);
                    }


  }

 ngOnInit(){
   this.movies =this.movieservice.loadAllMovies();
   this.orignalMoives=this.movies;
 }
  
   requestForAsync(cacheRequest) {
    return new Promise( function(resolve,reject){
        // pass an error-first style callback

             cacheRequest.onsuccess = function(event){
                     
                       if(cacheRequest.result){
                          resolve(cacheRequest.result.movie); 
                       }
                       else{
                         resolve(null);
                       }

                      }

     /*   makeAjaxCall( url, function(err,text){
            if (err) reject( err );
            else resolve( text );
        } );*/
    } );
}

/*
co(function* () {
  var result = yield Promise.resolve(true);
  return result;
}).then(function (value) {
  console.log(value);
}, function (err) {
  console.error(err.stack);
});
*/


 sortMoivesBy()
  {
    this.movies = this.movieservice.sortMoviesBy(this.movies,this.sortBy);
  }

  searchFor(movieName){
    console.log(movieName);
    let comp=this;
    if(movieName === '')
    {
    this.movies=this.orignalMoives;
    }
    else{
       //console.log('before search in cache');
      let orignalMovieName=movieName;
      let cacheRequest = this.getRequest(movieName);

      co(function* () {
          var result = yield comp.requestForAsync(cacheRequest);
          console.log('Yield Result '+result);
          return result;
      }).then(function (movieName) {
          if(movieName!=null){
           comp.movies= [movieName];
           console.log('From Cache');
          }
         else{
            comp.movies= comp.movieservice.searchFor(comp.movies,orignalMovieName);
               console.log('found movie '+comp.movies);
               comp.addMovieInCache(comp.movies,movieName);
           console.log('Added New To Cache');             
         }

         }, function (err) {
          console.error(err.stack);
        })

        /*let cacheRequest = this.getRequest(movieName);
        let cacheMovie=null;
          console.log(cacheRequest);
                    cacheRequest.onsuccess = function(event){
                     
                       if(cacheRequest.result){
                        //console.log("Name : "+request.result.movie);//.name);   
                        cacheMovie=cacheRequest.result.movie; 
                        comp.movies= [cacheMovie];
                        console.log('from cache');

                      }
                      else{
                         comp.movies= comp.movieservice.searchFor(comp.movies,movieName);
                         console.log('found movie '+comp.movies);
                          comp.addMovieInCache(comp.movies,movieName);
                          console.log('new to cache');
                      }
                       

                    };*/
    }

  }


    getRequest(movieName:string):any{
   
           let request = this.db.transaction(["moviesNDB"],"readwrite").objectStore("moviesNDB").get(movieName);
           return request;
                    //return null;
      
    }
    /*getMovieFromCache(movieName:string):Movie{
      if(movieName === ''){
         return null;
      }
      else
      {
          
            let request = this.db.transaction(["moviesNDB"],"readwrite").objectStore("moviesNDB").get(movieName);
            console.log(request);
                    request.onsuccess = function(event){
                       if(request.result){
                        console.log("Name : "+request.result.movie);//.name);   
                        
                        return request.result.movie; 
                      }else{
                        return null;
                      }
                    };
                    //return null;
      }
    }*/


  addMovieInCache(movies:Movie[],movieName:string){

      let transaction = this.db.transaction(["moviesNDB"],"readwrite");
                    transaction.oncomplete = function(event) {
                        console.log("Success");
                    };
                    
                    transaction.onerror = function(event) {
                        console.log("Error");
                    };  
                    let  objectStore = transaction.objectStore("moviesNDB");
                    
                    for(let index=0;index<movies.length;index++)
                    objectStore.add({name: movies[index].movie_title, movie: movies[index]});

  }



}  



import {Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {
  movies : Movie[];
  yearInput :any = null;
  isMovieList : boolean = true;
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  getMovieList(){
      if(this.yearInput != null){
        this.getMovieService(this.yearInput).subscribe((data:any) => {
         this.movies = data.data;
         if(this.movies.length > 0){
          this.isMovieList = true;
         }else{
           this.isMovieList = false;
         }
        });
      }
  }

  getMovieService(year:number): Observable<Movie> {
    return this.http.get<Movie>('https://jsonmock.hackerrank.com/api/movies?Year=' + year);
  }


}

export interface Movie {
  Title: string;
  Year: number;
  imdbID: number;
}

import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, catchError } from 'rxjs/operators';
import { Book } from "../_models/book";
import { Movie } from "../_models/movie";
import { Music } from "../_models/music";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl: string = "http://localhost:54488/api/";

  constructor(private http: HttpClient) { }

  getBook(): any {
    const url = this.baseUrl +"book";
    return this.http.get<Book[]>(url)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((err, caught) => {
          console.error(err);
          throw err;
        }
        )
      );
  }
  getMovie(): any {
    const url = this.baseUrl +"movie";
    return this.http.get<Movie[]>(url)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((err, caught) => {
          console.error(err);
          throw err;
        }
        )
      );
  }
  getMusic(): any {
    const url = this.baseUrl +"music";
    return this.http.get<Music[]>(url)
      .pipe(
        map((response) => {
          return response;
        }),
        catchError((err, caught) => {
          console.error(err);
          throw err;
        }
        )
      );
  }


}
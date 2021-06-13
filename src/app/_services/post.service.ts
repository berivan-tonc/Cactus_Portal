import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, } from "rxjs";
import { map, catchError } from 'rxjs/operators';
import { Post } from "../_models/post";
import { PostDTO } from "../_models/postDTO";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  baseUrl: string = "http://localhost:54488/api/post/";

  constructor(private http: HttpClient) { }

  search(cat: string, itemId: number): any {
    const url = this.baseUrl + "search?cat=" + cat + "&itemId=" + itemId.toString();
    return this.http.get<PostDTO[]>(url)
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

  homePost(userId: number): any {
    const url = this.baseUrl + "getbyFollowedId?id=" + userId;
    return this.http.get<PostDTO[]>(url)
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
  ownPost(userId: number): any {
    const url = this.baseUrl + "getbyUserId?id=" + userId;
    return this.http.get<PostDTO[]>(url)
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
  onDelete(post: Post): any {
    const url = this.baseUrl;
    return this.http.put<Post[]>(url,post)
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
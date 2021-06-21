import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, catchError } from 'rxjs/operators';
import { Follow } from "../_models/follow";
import { User } from "../_models/user";

@Injectable({
  providedIn: 'root'
})
export class FollowService {
  baseUrl: string = "http://localhost:54488/api/follow/";
  constructor(private http: HttpClient) { }

  follow(follow: Follow): any {
    const url = this.baseUrl;
    return this.http.post<Follow[]>(url,follow)
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

  
  controlFollow(userId: number,cntrlId:number): any {
    const url = this.baseUrl+userId+"/"+cntrlId;
    return this.http.get<Follow[]>(url)
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
  

  unfollow(id: number): any {
    const url = this.baseUrl+id;
    return this.http.delete<any>(url)
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
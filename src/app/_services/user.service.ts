import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, catchError } from 'rxjs/operators';
import { User } from "../_models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl: string = "http://localhost:54488/api/user/";

  constructor(private http: HttpClient) { }

  userInfo(userId: number): any {
    const url = this.baseUrl + "getbyId?id=" + userId;
    return this.http.get<User[]>(url)
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
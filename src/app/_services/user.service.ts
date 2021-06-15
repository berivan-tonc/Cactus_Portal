import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map, catchError } from 'rxjs/operators'
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

  loginUser(email: string, password: string): any{
    const url = this.baseUrl+ email + password;
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

  createUser(user : User): any {
    const url = this.baseUrl;
    return this.http.post<User[]>(url,user)
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

  editUser(user: User):any {
    const url = this.baseUrl;
    return this.http.put<User[]>(url,user)
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

  listFollowedUsers(id: number):any{
    const url = this.baseUrl + "getbyFollowedId?id=" + id;
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

  listFollowingUsers(id: number):any{
    const url = this.baseUrl + "getbyFollowingId?id=" + id;
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

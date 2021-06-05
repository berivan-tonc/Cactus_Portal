import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'client';
  users: any;

  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {
    this.getUsers();
  }
  getUsers() {
    this.http.get("http://localhost:54488/api/user").subscribe(res => {
      this.users = res;
    }, er => {
      console.error(er);
    }
    );
  }
}

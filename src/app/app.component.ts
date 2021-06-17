import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PostDTO } from './_models/postDTO';
import { PostService } from './_services/post.service';
import { DatePipe } from '@angular/common'
import { Router } from '@angular/router';
import { User } from './_models/user';
import { AuthenticationService } from './_services/authentication.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  user: User;

  constructor(
      private router: Router,
      private authenticationService: AuthenticationService
  ) {
      this.authenticationService.user.subscribe(x => this.user = x);
  }

  logout() {
      this.authenticationService.logout();
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PostDTO } from './_models/postDTO';
import { PostService } from './_services/post.service';
import { DatePipe } from '@angular/common'
import { User } from './_models';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  user: User | undefined;
  //TO DO: if there is error, remove undefined
  constructor(private accountService: AccountService) {
      this.accountService.user.subscribe(x => this.user = x);
  }

  logout() {
      this.accountService.logout();
  }
  ngOnInit(): void {
  }
}

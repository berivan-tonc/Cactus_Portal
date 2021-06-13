import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PostDTO } from './_models/postDTO';
import { PostService } from './_services/post.service';
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor() {
  }
  ngOnInit(): void {
  }
}

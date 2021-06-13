import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostDTO } from '../_models/postDTO';
import { PostService } from '../_services/post.service';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  select="home";

  constructor() {

  }
  ngOnInit(): void {
  }
}

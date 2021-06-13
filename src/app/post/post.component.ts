import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { PostDTO } from '../_models/postDTO';
import { PostService } from '../_services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  title = 'client';
  posts: PostDTO[] = [];
  points:number[]=[1,2,3];
  @Input() select?: string;

  constructor( private postService: PostService,public datepipe: DatePipe) {

  }
  ngOnInit(): void {
    if(this.select=="search"){
      this.getSearch();
    }else if(this.select=="home"){
      this.getHomePost();
    }else if(this.select=="profile"){
      this.getOwnPost();
    }
  }
  getSearch(){
    this.postService.search('b', 1).subscribe((res: any) => {
      this.posts=res;
    });
  }
  getHomePost(){
    this.postService.homePost(2).subscribe((res: any) => {
      this.posts=res;
    });
  }
  getOwnPost(){
    this.postService.ownPost(2).subscribe((res: any) => {
      this.posts=res;
    });
  }
  dateFormat(date:Date){
    return this.datepipe.transform(date.toString(), 'dd.MM.yyyy HH:mm');
  }

}

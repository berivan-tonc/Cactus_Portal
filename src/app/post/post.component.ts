import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../_models/post';
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
  loading: boolean = true;
  points: number[] = [1, 2, 3];
  @Input() select?: string;
  @Input() userId?: number;

  constructor(private postService: PostService, private route: ActivatedRoute, private router: Router, public datepipe: DatePipe) {

  }
  ngOnInit(): void {
    this.route.paramMap.subscribe(x => {
      if (x.get("userId") && this.select == "profile") { //sayfa parametresinden dolayı dinlemek gerekiyor
        this.userId = Number(x.get("userId"));
        this.getOwnPost(this.userId ? this.userId : 0);
      }
    });
    this.selectPage();
  }
  selectPage() {
    if (this.select == "search") {
      this.getSearch();
    } else if (this.select == "home") {
      this.getHomePost(this.userId ? this.userId : 0);
    } 
  }
  getSearch() {
    this.postService.search('b', 1).subscribe((res: any) => {
      this.posts = res;
      this.loading = false;
    });
  }
  getHomePost(userId: number) {
    this.postService.homePost(userId).subscribe((res: any) => {
      this.posts = res;
      this.loading = false;
    });
  }
  getOwnPost(userId: number) {
    this.postService.ownPost(userId).subscribe((res: any) => {
      this.posts = res;
      this.loading = false;
    });

  }
  onDelete(post: Post) {
    post.status = false;
    this.postService.onDelete(post).subscribe((res: any) => {
      this.selectPage();
      this.loading = false;
    });
  }
  dateFormat(date: Date) {
    return this.datepipe.transform(date.toString(), 'dd.MM.yyyy HH:mm');
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { PostService } from '../_services/post.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.css']
})
export class ExploreComponent implements OnInit {

  items: string[] = [];
  form!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postService: PostService) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      categorySelector: new FormControl()
   });
  }

  onItemSelected(cat :any){
    this.postService.explore(String(cat)).subscribe((res: any) => {
      this.items = res;
    });
    console.log(this.items)
  }

}

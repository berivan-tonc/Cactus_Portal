import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../_models/user';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DataService } from '../../_services/data.service';
import { PostService } from '../../_services/post.service';
import { Post } from '../../_models/post';
import { Music } from '../../_models/music';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  post: Post = new Post;
  flagSearch: boolean = true;
  options: any[] = [];
  filteredOptions!: Observable<any[]>;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private postService: PostService,
    public dialogRef: MatDialogRef<DialogComponent>, private dataService: DataService) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  onOk(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    } else {
      this.post.id = 0;
      this.post.movie_id = this.f.cat.value == "f" ? this.f.search.value.id : null;
      this.post.music_id = this.f.cat.value == "m" ? this.f.search.value.id : null;
      this.post.book_id = this.f.cat.value == "b" ? this.f.search.value.id : null;
      this.post.point = +this.f.point.value;
      this.post.status = true;
      this.post.user_id = JSON.parse(localStorage.getItem('user'))["id"]; 
      this.post.category = this.f.cat.value;
      this.post.comment = this.f.comment.value;
      this.postService.share(this.post).subscribe((res: any) => {
        this.router.navigate(['/profile', JSON.parse(localStorage.getItem('user'))["id"]]); 
        this.dialogRef.close();
      })
    }
  }
  get f() { return this.form.controls; }
  ngOnInit() {
    this.form = this.formBuilder.group({
      comment: ['', Validators.required],
      search: ['', [Validators.required, RequireMatch]],
      cat: ['', Validators.required],
      point: ['', Validators.required],
    });
    this.filteredOptions = this.f.search.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }
  getData(e: any) {
    this.flagSearch = false;
    if (e.target.value == "b") {
      this.dataService.getBook().subscribe((res: any) => {
        this.options = res;
        this._filter("")
      })

    } else if (e.target.value == "m") {
      this.dataService.getMusic().subscribe((res: any) => {
        this.options = res;
        this._filter("")
      })

    } else if (e.target.value == "f") {
      this.dataService.getMovie().subscribe((res: any) => {
        this.options = res;
        this._filter("")
      })
    }
  }

  private _filter(value: any): string[] {
    const catVal = this.f.cat.value;
    const filterVal1 = (value instanceof Object ? value.title : value).toLowerCase();
    const filterVal2 = (value instanceof Object ? catVal == "b" ? value.author : (catVal == "m" ? value.singer : value.year.toString()) : value).toLowerCase();
    return this.options.filter(option => option.title.toLowerCase().includes(filterVal1) ||
      (catVal == "b" ? option.author : (catVal == "m" ? option.singer : option.year.toString())).toLowerCase().includes(filterVal2));
  }
  getOptionText(option: { title: any; author: any; singer: any; year: any; }) {
    var field2 = option.author != undefined ? option.author : option.singer != undefined ? option.singer : option.year?.toString();
    return option.title == undefined ? "" : option?.title + "-" + field2;
  }
}
export function RequireMatch(control: AbstractControl) {
  const selection: any = control.value;
  if (typeof selection === 'string') {
    return { incorrect: true };
  }
  return null;
}

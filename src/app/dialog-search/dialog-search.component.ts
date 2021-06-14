import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DialogComponent } from '../share/dialog/dialog.component';
import { DataService } from '../_services/data.service';
import { PostService } from '../_services/post.service';

@Component({
  selector: 'app-dialog-search',
  templateUrl: './dialog-search.component.html',
  styleUrls: ['./dialog-search.component.css']
})
export class DialogSearchComponent implements OnInit {
  form!: FormGroup;
  submitted = false;
  flagSearch: boolean = true;
  options: any[] = [];
  filteredOptions!: Observable<any[]>;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<DialogSearchComponent>, private dataService: DataService) {
  }

  onNoClick(): void {
    this.dialogRef.close();
    this.router.navigate(['/home']); 
  }
  onOk(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    } else {
      this.dialogRef.close({ cat: this.f.cat.value,itemId: this.f.search.value.id });
    }
  }
  get f() { return this.form.controls; }
  ngOnInit() {
    this.form = this.formBuilder.group({
      search: ['', [Validators.required, RequireMatch]],
      cat: ['', Validators.required],
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

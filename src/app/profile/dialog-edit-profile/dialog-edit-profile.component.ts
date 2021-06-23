import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Validators } from '@angular/forms';
import { UserService } from 'src/app/_services/user.service';
import { User } from 'src/app/_models/user';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dialog-edit-profile',
  templateUrl: './dialog-edit-profile.component.html',
  styleUrls: ['./dialog-edit-profile.component.css']
})
export class DialogEditProfileComponent implements OnInit {
  form: FormGroup;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  userId: number;
  user: User = new User

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService:UserService,
    public datepipe: DatePipe
  ) { }


  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('user'))["id"]
  

    this.userService.userInfo(this.userId).subscribe((res: any) => {
      this.user = res;
      this.form = this.formBuilder.group({
        firstName: [this.user.firstname, Validators.required],
        lastName: [this.user.lastname, Validators.required],
    });
    })
  }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    this.user.firstname = this.form.controls['firstName'].value
    this.user.lastname = this.form.controls['lastName'].value
    console.log(this.user)
    this.userService.update(this.user)
    .pipe()
    .subscribe({
        next: () => {
            this.router.navigate(['/profile'+this.userId], { relativeTo: this.route });
        },
        error: error => {
            this.loading = false;
        }
    });
    
}
}

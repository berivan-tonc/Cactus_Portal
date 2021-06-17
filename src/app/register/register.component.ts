import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  placeholderEmail = 'Enter Email'
  placeholderPass = 'Enter Password'
  placeholderFirstName = 'Enter First Name'
  placeholderLastName = 'Enter Last Name'
  placeholderGender = 'Select Gender'
  loading = false;
  submitted = false;
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private AuthenticationService: AuthenticationService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        gender: ['', Validators.required],
        birthday: ['', Validators.required],
    });
  }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }

    console.log(this.form.value);
    this.loading = true;
    this.AuthenticationService.register(this.form.value)
        .pipe(first())
        .subscribe({
            next: () => {
              this.router.navigate(['../login'], { relativeTo: this.route });
            },
            error: error => {
                this.loading = false;
            }
        });
 }

}

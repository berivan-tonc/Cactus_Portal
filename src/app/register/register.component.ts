import { Component, OnInit } from '@angular/core';
import { EmailValidator } from '@angular/forms';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

}

import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
@Component({
  selector: 'app-dialog-following',
  templateUrl: './dialog-following.component.html',
  styleUrls: ['./dialog-following.component.css']
})
export class DialogFollowingComponent implements OnInit {
  items: User[] = [];
  userId: number;
  constructor(private userService:UserService,
    ) {

  }
    
  public ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('user'))["id"]
    this.userService.getFollowingUsersList(this.userId).subscribe((res: any) => {
      this.items = res;
      console.log(this.items)
    });
  }
  }



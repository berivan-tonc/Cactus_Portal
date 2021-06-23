import { Component, OnInit, ViewChild } from '@angular/core';
import { IgxListComponent, IgxToastComponent } from 'igniteui-angular';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-dialog-followers',
  templateUrl: './dialog-followers.component.html',
  styleUrls: ['./dialog-followers.component.css']
})
export class DialogFollowersComponent implements OnInit {
  items: User[] = [];
  userId: number;
  constructor(private userService:UserService,
    ) {

  }

  public ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem('user'))["id"]
    this.userService.getFollowedUsersList(this.userId).subscribe((res: any) => {
      this.items = res;
      console.log(this.items)
    });
  }
}

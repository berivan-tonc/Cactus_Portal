import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Follow } from '../_models/follow';
import { User } from '../_models/user';
import { FollowService } from '../_services/follow.service';
import { UserService } from '../_services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogFollowersComponent } from './dialog-followers/dialog-followers.component';
import { DialogFollowingComponent } from './dialog-following/dialog-following.component';
import { DialogEditProfileComponent } from './dialog-edit-profile/dialog-edit-profile.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  select = "profile";
  userId: number = 0;
  user: User = new User
  fl: Follow = new Follow;
  buttonControl: boolean = false;
  followId!: number;

  constructor(private router: Router, 
    private followService: FollowService, 
    private route: ActivatedRoute, 
    private userService: UserService, 
    public datepipe: DatePipe,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.get("userId")) {
        this.userId = Number(params.get("userId"));
        this.userService.userInfo(this.userId).subscribe((res: any) => {
          this.user = res;
          this.followService.controlFollow(JSON.parse(localStorage.getItem('user'))["id"], this.user.id).subscribe((res: any) => {
            if (res != null) {
              this.buttonControl = true;
              this.followId=res.id;
            }
          })

        })
      }
    }
    )
  }
  onFollow(profileId: number) {
    if (this.buttonControl == true) { // takipten çık
      this.followService.unfollow(this.followId).subscribe((res: any)=>{
        this.buttonControl = false;
        
      })

    } else { // takip et
      this.fl.following_id = JSON.parse(localStorage.getItem('user'))["id"];
      this.fl.followed_id = profileId;
      this.followService.follow(this.fl).subscribe((res: any) => {
        this.buttonControl = true;
        this.followId=res.id;
      })
    }
  }
  cntrlButton(){
    return this.userId!=JSON.parse(localStorage.getItem('user'))["id"]
  }
  dateFormat(date: Date) {
    return date ? this.datepipe.transform(date.toString(), 'dd.MM.yyyy') : "";
  }

  openDialogFollowers() {
    const dialogRef = this.dialog.open(DialogFollowersComponent, {width:'600px'
  });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialogFollowing() {
    const dialogRef = this.dialog.open(DialogFollowingComponent, {width:'600px'
  });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}

import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Follow } from '../_models/follow';
import { User } from '../_models/user';
import { FollowService } from '../_services/follow.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  select = "profile";
  userId: number = 1;
  user: User = new User
  fl: Follow = new Follow;
  buttonControl: boolean = false;
  followId!: number;

  constructor(private router: Router, private followService: FollowService, private route: ActivatedRoute, private userService: UserService, public datepipe: DatePipe) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.get("userId")) {
        this.userId = Number(params.get("userId"));
        this.userService.userInfo(this.userId).subscribe((res: any) => {
          this.user = res;
          // user, giriş yapan kişi mi kontrol et. değilse
          this.followService.controlFollow(1, this.user.id).subscribe((res: any) => {
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
      this.fl.following_id = 1;//giriş yapan
      this.fl.followed_id = profileId;
      this.followService.follow(this.fl).subscribe((res: any) => {
        this.buttonControl = true;
        this.followId=res.id;
      })
    }
  }
  dateFormat(date: Date) {
    return date ? this.datepipe.transform(date.toString(), 'dd.MM.yyyy') : "";
  }

}

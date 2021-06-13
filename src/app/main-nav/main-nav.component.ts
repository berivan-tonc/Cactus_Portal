import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
enum MainPage {
  home = 1,
  share = 2,
  search = 3,
  explore = 4,
  profile = 5
}
@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {
  pageAc: MainPage | undefined;
  constructor(private router: Router) {

    this.router.events.subscribe(x => {
      if (x instanceof NavigationEnd) {
        if (x.url.indexOf("home") > 0) {
          this.pageAc = MainPage.home;
        }
        else if (x.url.indexOf("share") > 0) {
          this.pageAc = MainPage.share;
        } else if (x.url.indexOf("search") > 0) {
          this.pageAc = MainPage.search;
        }
        else if (x.url.indexOf("explore") > 0) {
          this.pageAc = MainPage.explore;
        } else if (x.url.indexOf("profile") > 0) { // koşul gelecek 
          this.pageAc = MainPage.profile;
        } 
        else {
          this.pageAc = MainPage.home;
        }

      }
    }
    )
  }

  ngOnInit(): void {
  }

}

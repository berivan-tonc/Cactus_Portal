import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreComponent } from './explore/explore.component';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component'
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { ShareComponent } from './share/share.component';
import { PostComponent } from './post/post.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {
    path: "", component: LayoutComponent,
    children: [
      { path:"", component:LoginComponent},
      { path: "", redirectTo: "/home", pathMatch: 'full'},
      { path: "register", component:RegisterComponent },
      { path: "home", component: HomeComponent },
      { path: "profile", component: ProfileComponent },
      { path: "share", component: ShareComponent },
      { path: "search", component: SearchComponent },
      { path: "explore", component: ExploreComponent },
      { path: "post", component: PostComponent },
      { path: '**', redirectTo: '' }
    ]
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

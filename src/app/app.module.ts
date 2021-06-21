import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS }from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { MainNavComponent } from './main-nav/main-nav.component'
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ShareComponent } from './share/share.component';
import { ExploreComponent } from './explore/explore.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { PostComponent } from './post/post.component';
import { LoginComponent } from './login/login.component';
import { BasicAuthInterceptor } from './_helpers/basic-auth.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { RegisterComponent } from './register/register.component';
import { DialogComponent } from './share/dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { DialogSearchComponent } from './dialog-search/dialog-search.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
    MainNavComponent,
    ShareComponent,
    ExploreComponent,
    ProfileComponent,
    SearchComponent,
    PostComponent,
    LoginComponent,
    RegisterComponent,
    DialogComponent,
    DialogSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatCardModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    MatAutocompleteModule
  ],
  providers: [DatePipe, 
    { provide: HTTP_INTERCEPTORS, useClass: BasicAuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
],
  bootstrap: [AppComponent]
})
export class AppModule { }

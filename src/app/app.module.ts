import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GraphqlModule } from './graphql/graphql.module';
import { LoginComponent } from './components/login/login.component';
import {FormsModule} from '@angular/forms';
import { MeComponent } from './components/me/me.component';
//spinner
import { NgxSpinnerModule } from "ngx-spinner";
import { UsersComponent } from './components/users/users.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MeComponent,
    UsersComponent,
    NavbarComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    GraphqlModule,
    FormsModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit,OnDestroy } from '@angular/core';
import {LoginI,ResultTokenI} from 'src/app/interfaces/login.interface';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { MeI } from 'src/app/interfaces/me.interface';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit ,OnDestroy{
  meSubscription:Subscription=null;
  loginSubscription:Subscription=null;
  show:boolean=null;
  user:LoginI={
    email:null,
    password:null
  };

  error:boolean=false;

  constructor(private _apiService:ApiService,private router:Router,private _authService:AuthService) {
    this._authService.userVar$.subscribe((result:MeI)=>{
      if(result===null||result.status===false){
        this.show=true;
      }else{
        this.show=false;
      }
    });
   }

  ngOnInit(): void {
    this._authService.start();
  }
  ngOnDestroy(){
    if(this.meSubscription!==null){
      this.meSubscription.unsubscribe();
    }
    if(this.loginSubscription!==null){
      this.loginSubscription.unsubscribe();
    }
  }

  save(){
    console.log(this.user)
    const{email,password}=this.user;
    this.loginSubscription=this._apiService.login(email,password).subscribe((result:ResultTokenI)=>{
      this.show=true;
      if(result.status){
        this.error=false;
        localStorage.setItem('token',result.token);
        console.log('Login exitoso');
        this.router.navigate(['/me']);
        this._authService.updateStateAccess(true);
      }else{
        this.error=true
        localStorage.removeItem('token');
        console.log('Login erróneo');
        this._authService.updateStateAccess(false);
      }
    });
  }

}

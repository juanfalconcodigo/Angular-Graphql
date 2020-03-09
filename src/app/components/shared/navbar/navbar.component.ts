import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { MeI } from 'src/app/interfaces/me.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit,OnDestroy {
  meSubscription:Subscription=null
  access:boolean;
  constructor(private _authService:AuthService,private router:Router) { 
    this._authService.accessVar$.subscribe((data:boolean)=>{
      console.log('Sesion state',data);
      if(data===false&&this.access){
        this.access=false;
        this.logout();
      }else{
        this.access=data;
      }
    })
  }

  ngOnInit(): void {
    this._authService.start();
  }

  ngOnDestroy(){
    this.meSubscription.unsubscribe();
  }

  logout(){
   this._authService.logout();
  }

}

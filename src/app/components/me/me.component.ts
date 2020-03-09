import { Component, OnInit, OnDestroy } from '@angular/core';
import { MeI } from 'src/app/interfaces/me.interface';
import { Router } from '@angular/router';
//spinner
import { NgxSpinnerService } from "ngx-spinner";
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.scss']
})
export class MeComponent implements OnInit,OnDestroy {

  meSubscription:Subscription=null;
  user:any;

  constructor(private router:Router,private spinner: NgxSpinnerService,private _authService:AuthService) {
    this._authService.userVar$.subscribe((result:MeI)=>{
      if(result!==null&&result.status!==undefined){
        this.user=result.user;
      }
    });
   }

  ngOnInit(): void {

    this.functionSpinner();
    this._authService.start();
  
  }

  ngOnDestroy(){
    if(this.meSubscription!==null){
      this.meSubscription.unsubscribe();
    }
  }

  functionSpinner(){
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 3000);
  }

  logout(){
    this._authService.logout();
  }

}

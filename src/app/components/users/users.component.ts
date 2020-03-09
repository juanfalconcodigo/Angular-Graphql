import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { UserI } from 'src/app/interfaces/user.interface';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit,OnDestroy {

  userSubscription:Subscription=null;
  users:UserI[]=[];

  constructor(private _apiService:ApiService,private _authService:AuthService) { }

  ngOnInit(): void {
    this._authService.start();

    this.userSubscription=this._apiService.getUsers().subscribe((result:UserI[])=>{
      this.users=result;
      console.log(this.users);
    });
  }

  ngOnDestroy(){
    this.userSubscription.unsubscribe();
  }

}

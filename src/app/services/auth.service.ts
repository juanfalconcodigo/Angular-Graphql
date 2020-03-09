import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { me } from '../operations/query';
import { Subject } from 'rxjs';
import { MeI } from 'src/app/interfaces/me.interface';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public accessVar=new Subject<boolean>();
  public accessVar$=this.accessVar.asObservable();

  public userVar=new Subject<MeI>();
  public userVar$=this.userVar.asObservable();

  constructor(private apollo:Apollo,private router:Router) { }

  public updateStateAccess(access:boolean){
    this.accessVar.next(access);
  }

  public updateStateUser(user:MeI){
    this.userVar.next(user);
  }
  

  me(token:string){
    return this.apollo.watchQuery({
      query:me,
      context:{
        headers:new HttpHeaders({
          'authorization':token
        })
      },
      fetchPolicy:'network-only'
    }).valueChanges.pipe(map((result:any)=>result['data'].me));
  }

  logout(){
    localStorage.removeItem('token');
    this.updateStateAccess(false);
    const currentRouter=this.router.url;
    if(currentRouter!=="/register"&&currentRouter!=='/users'){
      this.router.navigate(['/login']);
    }
  }

  private sincroValues(result:MeI,state:boolean){
    this.updateStateUser(result);
    this.updateStateAccess(state);
  }

  start(){
    const token:string=localStorage.getItem('token');
    if(token===null){
      this.sincroValues(null,false);
    }else{
        this.me(token).subscribe((result:MeI)=>{
        if(result.status){
          if(this.router.url==='/login'){
            this.sincroValues(result,true);
            this.router.navigate(['/me']);
          }
        }
        this.sincroValues(result,result.status);
      });
    }
  }


}

import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { getUsers,login,me } from '../operations/query';
import {map} from 'rxjs/operators';
import { UserInputI } from '../interfaces/userinput.interface';
import { postUser } from '../operations/mutation';
 @Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private apollo:Apollo) { }

  getUsers(){
    return this.apollo.watchQuery({
      query:getUsers,
      fetchPolicy:'network-only'
    }).valueChanges.pipe(map((result:any)=>{
      return result['data'].users;
    }));
  }

  login(email:string,password:string){
    return this.apollo.watchQuery({
      query:login,
      variables:{
        email,
        password
      },
      fetchPolicy:'network-only'
    }).valueChanges.pipe(map((result:any)=>{
      return result['data'].login;
    }));
  }

  postUser(user:UserInputI){
    return this.apollo.mutate({
      mutation:postUser,
      variables:{user}
    });
  }

  


}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserInputI } from 'src/app/interfaces/userinput.interface';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MeI } from 'src/app/interfaces/me.interface';
import { ApiService } from 'src/app/services/api.service';
import { RegisterResultI } from 'src/app/interfaces/register.interface';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit,OnDestroy {
  meSubscription:Subscription=null;
  user:UserInputI={
    name:'',
    lastname:'',
    email:'',
    password:''
  }
  constructor(private _authService:AuthService,private _apiService:ApiService) { }

  ngOnInit(): void {
    this._authService.start();
  }
  ngOnDestroy(){
    if(this.meSubscription!==null){
      this.meSubscription.unsubscribe();
    }
  }

  register(forma:NgForm){
    if(forma.invalid){
      console.log("Formulario inválido");
      return;
    }

    const {value:user}=forma;
    this._apiService.postUser(user).subscribe(({data}:any)=>{
      console.log(data.register);
      if(!data.register.status){
        Swal.fire({
          allowOutsideClick:false,
          title: 'Error!',
          text: data.register.message,
          icon: 'error',
          confirmButtonText: 'Lo entendí',
        });
      }else{
        Swal.fire({
          allowOutsideClick:false,
          title: 'Success!',
          text: data.register.message,
          icon: 'success',
          confirmButtonText: 'Ok',
        });
      }
    },
    (err)=>{
      console.log('Huvo un error en la petición');
    })

  }

}

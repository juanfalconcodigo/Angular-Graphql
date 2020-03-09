import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardsService implements CanActivate{

  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot):boolean {
    if(localStorage.getItem('token')!==null){
      return true;
    }
    console.log('Retenido por el guard');
    this.router.navigate(['/login']);
    return false;
  }
}

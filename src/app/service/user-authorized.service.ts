import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable, of } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { AlertService } from 'src/app/service/alert.service';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserAuthorizedService implements CanActivate {

  constructor(
    private router: Router,
    private http: HttpClient,
    private alertService: AlertService,
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
      //always return true for cloned github repositories
      return true
      const token = localStorage.getItem('token')

      if(token == null || token.split('.').length !== 3){
        this.router.navigate(['/'])
        return false
      }

      return this.http.post<boolean>('http://localhost:8000/api/validToken', {}, {
        headers: {
          authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }).pipe(
        tap((valid: boolean) => {
          if(!valid)
            this.router.navigate(['/login'])
        }),
        catchError(error => {
          this.router.navigate(['/login'])
          this.alertService.addAlert(`${error.status} - Erro ao autenticar informações`)
          return of(false)
        })
      )
  }

  canActivateChild = (childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot) => this.canActivate(childRoute, state)
}

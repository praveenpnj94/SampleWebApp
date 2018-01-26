import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { Token } from '../../models/Token';
@Injectable()
export class AuthService {

    constructor(private router:Router) {
    }
    loggedIn: boolean;
    loggedIn$ = new BehaviorSubject<boolean>(this.loggedIn);
    // isLoggedIn() : Observable<boolean> {
    //     return this.loggedIn$.asObservable();
    //    }
    setLoggedIn(value: boolean) {
        this.loggedIn$.next(value);
        this.loggedIn = value;
      }
    public getToken(): string {
        return localStorage.getItem('access_token');
    }
    public hasToken(): boolean {
        if(this.getToken()){
            return true;
        }
        return false;
    }  
    public setToken(token:string){
        localStorage.setItem('access_token',token);
    }
    postLogin(token:string){
        this.setToken(token);
        this.setLoggedIn(true);
    }

    logout(){
        localStorage.removeItem('access_token');
        this.setLoggedIn(false);
        this.router.navigate(['/signin']);
    }
}

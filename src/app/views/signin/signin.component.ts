import { Component, OnInit, ViewChild } from '@angular/core';
import { MatProgressBar, MatButton } from '@angular/material';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders,HttpErrorResponse } from '@angular/common/http'; 
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Token } from '../../models/Token';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  @ViewChild(MatProgressBar) progressBar: MatProgressBar;
  @ViewChild(MatButton) submitButton: MatButton;
  signinForm: FormGroup;
  displayError=false;

  constructor(private router:Router,private http:HttpClient,private authService:AuthService) {}

  ngOnInit() {
    this.signinForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required,Validators.minLength(6),Validators.maxLength(16)])
    });
  }

  signin() {
    this.progressBar.mode = 'indeterminate';
    this.submitButton.disabled = true;
    const signinData = this.signinForm.value;
    let signinDataModified = {client_id:'wepact-webapp',client_secret:'4da26d5b-b418-4324-932c-dd3cb1abca91', grant_type: 'password', username: signinData.username, password: signinData.password };
    const logindata = this.transformRequest(signinDataModified);
    let httpOptions = new HttpHeaders();
    httpOptions=httpOptions.set('Content-Type','application/x-www-form-urlencoded');
    /*
    this.signinService.signin(logindata)
    .subscribe((data)=>{
      this.submitButton.disabled = true;
      console.log(data);
    },(error)=>{
      console.log(error);
    })
    */
    this.http.post(environment.apipoint + 'fineract-provider/api/oauth/token', logindata, {headers:httpOptions})
    .subscribe((data:Token)=>{
      this.submitButton.disabled = false;
      this.progressBar.mode="determinate";
      if(data){
        if(data.access_token){
          this.authService.postLogin(data.access_token);
        }
      }
      this.router.navigate(['/profile']);
    },
    (err: HttpErrorResponse) => {
      this.progressBar.mode="determinate";
      this.submitButton.disabled=false;
      if (err.error instanceof Error) {
        console.log('An error occurred:', err.error.message);
      } else {
        this.displayError= true;
      }
    }
  );
}
  transformRequest(loginData: Object) {
    let str: any[] = [];
    for (var p in loginData)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(loginData[p]));
    return str.join("&");
}
removeMsg() {
    this.displayError=false;
  };
}

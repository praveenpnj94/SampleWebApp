import {Injectable} from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpErrorResponse } from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import { AuthService } from './auth/auth.service';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {

    }
    addHeader(req: HttpRequest<any>): HttpRequest<any> {
        req= req.clone({ headers: req.headers.set('fineract-platform-tenantid', 'default') });
        const token: string =this.authService.getToken();
        if (token) {
            req = req.clone({ headers: req.headers.set('authorization', 'bearer ' + token) });
        }
        return req;
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
        /*req = req.clone({ headers: req.headers.set('fineract-platform-tenantid', 'default') });
        const token: string =this.authService.getAuthToken(); //Get token from some service
        if (token) {
            req = req.clone({ headers: req.headers.set('authorization', 'bearer ' + token) });
        }
        console.log(req);
        return next.handle(req);*/
        return next.handle(this.addHeader(req))
        .catch(error => {
            if (error instanceof HttpErrorResponse) {
                if(error.status===401||error.status===403){
                    this.authService.logout();
                }
            } else {
                return Observable.throw(error);
            }
        });
    }
}

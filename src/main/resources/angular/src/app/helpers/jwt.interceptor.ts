import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SERVER} from '../../environments/environment';
import { UserDataService } from '../services/user-data.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private userData: UserDataService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const user = this.userData.getUser();
        const isLoggedIn = user && user.token;
        const isApiUrl = request.url.startsWith(SERVER);
        if (isLoggedIn && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${user.token}`
                }
            });
        }

        return next.handle(request);
    }
}

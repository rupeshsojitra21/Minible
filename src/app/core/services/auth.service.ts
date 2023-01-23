import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { EnvoirmentService } from '../services/envoirment.service';
import { ApiConstants } from '../services/constants';
import { getFirebaseBackend } from '../../authUtils';
import { LoginModel, LoginResponse } from '../../models/login/login.model';
import { User } from '../models/auth.models';
import { catchError, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUsers: Observable<any>;
    private UserContextVMCache$!: Observable<any>;
    user: User;

    constructor(
        private http: HttpClient,
        private envService: EnvoirmentService,
        private router: Router
    ) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUsers = this.currentUserSubject.asObservable();
    }

    /**
     * Returns the current user
     */
    public currentUser(): User {
        // return getFirebaseBackend().getAuthenticatedUser();
        return this.currentUserSubject.value;
    }

    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */
    // login(email: string, password: string) {
    //     return getFirebaseBackend().loginUser(email, password).then((response: any) => {
    //         const user = response;
    //         return user;
    //     });
    // }

    // login(model: LoginModel): Observable<any> {
    //     return this.http.post(this.envService.Url + ApiConstants.apiEndPoints.auth.login, model)
    // }

    login(model: LoginModel): Observable<boolean> {

        const headers = new HttpHeaders()
            .set('content-type', 'application/json')
            .set('Access-Control-Allow-Origin', '*')
            .set('generaltoken', 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJJbnN0YWxsSUQiOiJUb3IifQ.A-uukYLf7KCXoiduxUsdV8j4fMO8jESyBh_OQatAMIs');
        // this.clearStorage();
        this.UserContextVMCache$ = this.http
            .post<any>(this.envService.Url + ApiConstants.apiEndPoints.auth.login, model)
            .pipe(
                map((resp) => {
                    let uCtx = JSON.parse(resp.body) as LoginResponse;
                    localStorage.setItem('currentToken', JSON.stringify(uCtx['data']));
                    localStorage.setItem('token', JSON.stringify(uCtx['data']['secret_token']));
                    localStorage.setItem('currentUser', JSON.stringify(resp));
                    this.currentUserSubject.next(resp);

                    // this.currentUserTokentSubject = new BehaviorSubject<User>(
                    //     JSON.parse(localStorage.getItem('currentToken')!)
                    // );
                    //this.setLanguageLocalStorage();
                    // this.getPermission(uCtx['data']['permission_id']);
                    return uCtx;
                }),
                catchError((err) => {
                    return of(false);
                })
            );

        return this.UserContextVMCache$;
    }

    /**
     * Performs the register
     * @param email email
     * @param password password
     */
    register(email: string, password: string) {
        return getFirebaseBackend().registerUser(email, password).then((response: any) => {
            const user = response;
            return user;
        });
    }

    /**
     * Reset password
     * @param email email
     */
    resetPassword(email: string) {
        return getFirebaseBackend().forgetPassword(email).then((response: any) => {
            const message = response.data;
            return message;
        });
    }

    /**
     * Logout the user
     */
    logout() {
        // logout the user
        getFirebaseBackend().logout();
    }


    clearStorage() {
        localStorage.removeItem('currentToken');
        localStorage.removeItem('token');
        localStorage.removeItem('permission');
        localStorage.removeItem('language');
        localStorage.removeItem('languagesUrl');
        this.router.navigate(['/login']);
    }
}


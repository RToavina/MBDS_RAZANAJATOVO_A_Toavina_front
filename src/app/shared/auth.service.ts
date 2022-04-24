import {Injectable} from '@angular/core';
import {User} from "./model/user";
import {Auth} from "./model/auth";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {shareReplay, Subject, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user?: User | null;
  userSubject: Subject<User | null> = new Subject<User|null>();

  constructor(private http: HttpClient, private router: Router) {
  }

  url = "http://localhost:8010/api/";

  register(user: User) {
    return this.http.post<Auth>(this.url + 'auth/register', user).pipe(tap(res => {
      this.setSession(res);
      this.getUser();
    }), shareReplay());
  }

  login(email: string, password: string) {
    return this.http.post<Auth>(this.url + 'auth/login', {email: email, password: password})
      .pipe(tap(res => {
        this.setSession(res);
        this.getUser();
      }), shareReplay());
  }

  private setSession(authResult: Auth) {
    localStorage.setItem('id_token', authResult.token);
    localStorage.setItem('is_auth', authResult.auth.toString());
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("is_auth");
    this.user = null;
    this.userSubject.next(null);
  }

  getUser() {
    if(!this.user) {
      const token = this.getToken()
      let headers = new HttpHeaders()
      headers = headers.append('X-Access-Token', token? token : '');
      this.http.get<User>(this.url + 'auth/me', {headers: headers}).subscribe(u =>{
        this.user = u;
        this.userSubject.next(u);
      });
    }else {
      this.userSubject.next(this.user);
    }

  }

  isLoggedIn() {
    return this.isAuth();
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  isAuth() {
    const auth = localStorage.getItem("is_auth");
    const isAuth = auth == 'true'
    return isAuth;
  }

  getToken() {
    return localStorage.getItem("id_token");
  }
}

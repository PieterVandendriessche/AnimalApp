import { Injectable, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Profile } from 'selenium-webdriver/firefox';
import { User } from '../models/profile.model';
import { ProfileService } from '../services/profile.service';

function parseJwt(token) {
  if (!token) {
    return null;
  }
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(window.atob(base64));
}

@Injectable()
export class AuthenticationService {
  private readonly _tokenKey = 'currentUser';
  private readonly _url = '/API/users';
  private _user$: BehaviorSubject<string>;
  public redirectUrl: string;
  
  constructor(private http: HttpClient) {
    let parsedToken = parseJwt(localStorage.getItem(this._tokenKey));
    if (parsedToken) {
      const expires =
        new Date(parseInt(parsedToken.exp, 10) * 1000) < new Date();
      if (expires) {
        localStorage.removeItem(this._tokenKey);
        parsedToken = null;
      }
    }
    this._user$ = new BehaviorSubject<string>(
      parsedToken && parsedToken.username
    );
  }

  get user$(): BehaviorSubject<string> {
    return this._user$;
  }

  get token(): string {
    const localToken = localStorage.getItem(this._tokenKey);
    return !!localToken ? localToken : '';
  }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post(`${this._url}/login`, { username, password }).pipe(
      map((res: any) => {
        const token = res.token;
        if (token) {
          localStorage.setItem(this._tokenKey, token);
          this._user$.next(username);
  
          return true;
        } else {
          return false;
        }
      })
    );
  }
  logout() {
    if (this.user$.getValue()) {
      localStorage.removeItem(this._tokenKey);
      setTimeout(() =>{
        this._user$.next(null);
      })
  
    }
  }
  register(username: string, password: string): Observable<boolean> {
    return this.http.post(`${this._url}/register`, { username, password }).pipe(
      map((res: any) => {
        const token = res.token;
        if (token) {
          localStorage.setItem(this._tokenKey, token);
          this._user$.next(username);
          return true;
        } else {
          return false;
        }
      })
    );
  }

  checkUserNameAvailability(username: string): Observable<boolean> {
    return this.http.post(`${this._url}/checkusername`, { username }).pipe(
      map((item: any) => {
        if (item.username === 'alreadyexists') {
          return false;
        } else {
          return true;
        }
      })
    );
  }

  getProfile():Observable<User>{

      return this.http
        .get(`${this._url}/get/${this._user$.value}`)
        .pipe(map((item:any): User =>
          new User(item.username,item.money,item.food,item.drink))
           );
  

  }
  updateProfile(user: User):Observable<User>{

    return this.http
      .put(`${this._url}/update/${user.username}`,user.toJSON())
      .pipe(map((item:any): User =>
        new User(item.username,item.money,item.food,item.drink))
         );


}
}


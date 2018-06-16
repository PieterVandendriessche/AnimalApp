import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { User } from './../models/profile.model';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { EmptyObservable } from 'rxjs/observable/EmptyObservable';


@Injectable()
export class ProfileService {
  private readonly _url = '/API/users';
  public _user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router, private authenticationService: AuthenticationService) {
    this.updateScreen();

  }

  private getProfile(username: String): Observable<User> {
    return this.http
      .get(`${this._url}/get/${username}`)
      .pipe(map((item: any): User =>
        new User(item.username, item.money, item.food, item.drink))
      );


  }


  updateProfile(user: User): Observable<User> {

    return this.http
      .put(`${this._url}/update/${user.username}`, user.toJSON())
      .pipe(map((item: any): User =>
        new User(item.username, item.money, item.food, item.drink))
      );


  }


  updateScreen() {
    if (!this.authenticationService.user$.value) {
      this._user.next(null)
    }
    else {
      this.getProfile(this.authenticationService.user$.value).subscribe(item => {
        this._user.next(item);
      })
    }


  }

}

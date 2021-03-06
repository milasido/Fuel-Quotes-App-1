import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { User } from '../_models/user';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  profile: any;
  quote: any;
  prices: any;
  baseURL = environment.apiURL;
  private profilePicURL = new Subject<string>();
  profilePicURL$ = this.profilePicURL.asObservable();
  private isSetProfilePic = new Subject<boolean>();
  isSetProfilePic$ = this.isSetProfilePic.asObservable();
constructor(private http: HttpClient) { }
getUser(username: string): Observable<User> {
  return this.http.get<User>(this.baseURL + 'users/' + username);
}
createProfile(username: string, model: any) {
  return this.http.post(this.baseURL + 'users/' + username + '/profile', model).
  pipe(
    map((response: any) => {
      this.profile = response;
    }));
}
getQuote(username: string, model: any) {
  return this.http.post(this.baseURL + 'users/' + username + '/quote', model).
  pipe (
    map((response: any) => {
      this.quote = response;
      if (Object.keys(this.quote).length > 0) {
        localStorage.setItem('suggestedPrice', this.quote.suggestedPrice);
        localStorage.setItem('amountDue', this.quote.amountDue);
      }
    }));
}
getPrice(username: string, model: any) {
  return this.http.post(this.baseURL + 'users/' + username + '/getPrice', model).
  pipe (
    map((response: any) => {
      this.prices = response;
      if (Object.keys(this.prices).length > 0) {
        localStorage.setItem('suggestedPrice', this.prices.suggestedPrice);
        localStorage.setItem('amountDue', this.prices.amountDue);
      }
    }));
}
profilePic(profilePicLink: string) {
  this.profilePicURL.next(profilePicLink);
}
isSetPicProfile(isSet: boolean) {
  this.isSetProfilePic.next (isSet);
}
}


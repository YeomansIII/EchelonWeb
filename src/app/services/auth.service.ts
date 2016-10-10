import {Injectable} from '@angular/core';
import {AngularFire} from 'angularfire2';
import {Router} from '@angular/router';
import {Http, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable()
export class AuthService {
  loggedIn: boolean = false;

  //echelon_worker_url: string = "https://echelon-1000.appspot.com/";
  echelon_worker_url: string = "http://localhost:8080/";
  private http: Http;

  constructor(public af: AngularFire,
              public router: Router,
              http: Http) {
    af.auth.subscribe(user => {
      if (user) {
        this.loggedIn = true;
      }
    });
    this.http = http;
  }

  authWithWorker(uid: string, accessToken: string) {
    let body = JSON.stringify({uid: uid, access_token: accessToken, development: !environment.production});
    return this.http.post(this.echelon_worker_url + 'spotify-auth', body)
      .map(res => res.json())
      .do(data => console.log(data))
      .catch(this.handleError);
  }

  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}

import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
// import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
// import { tokenNotExpired } from 'angular2-jwt';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // have a couple of properties in the auth service
  authToken: any;
  user: any;

  // Inject the modules into the constructor
  constructor(
    private http:Http,
    public jwtHelper:JwtHelperService
    ) { }

  /**
   * Function to register to the user
   * Here is where we actually reach into our backend API and make that post request to register
   * @param user: json sent to local server conatining all information for adding/registering new users
   */
  registerUser(user) {
    // Set header values
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
    // return this.http.post('users/register', user, {headers: headers})
      .pipe(map(res => res.json()));
  }

  /**
   * Authenticate the login information for the specific user.
   * @param user: json sent to local server conatining all information for authenticating existed users.
   */
  authenticateUser(user) {
    // Set header values
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
    // return this.http.post('users/authent/icate', user, {headers: headers})
      .pipe(map(res => res.json()));
  }

  /**
   * Load the data in local storage and set it as current user.
   */
  getProfile() {
    // Set header values
    let headers = new Headers();
    this.loadToken();
    if (this.authToken) {
      // console.log("We can access here!!!");
      // Use the token here
      headers.append('Authorization', this.authToken);
      headers.append('Content-Type','application/json');
      return this.http.get('http://localhost:3000/users/profile', {headers: headers})
      // return this.http.get('users/profile', {headers: headers})
        .pipe(map(res => res.json()));
    } else {
      headers.append('Content-Type','application/json');
      return this.http.get('http://localhost:3000/users/nulluser', {headers: headers})
        .pipe(map(res => res.json()));
    }
  }

  /**
   * Store login information in local storage
   * @param token: the token information of authentication
   * @param user: the user information of login user
   */
  storeUserData(token, user) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  /**
   * Get token from local storage
   */
  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  // loggedIn() {
  //   return tokenNotExpired();
  // }

  /**
   * Judge whether the token of login user has expired.
   */
  isTokenExp(){
    return this.jwtHelper.isTokenExpired();
  }

  /**
   * Functionality of logout and set token and user information as null. Finally clear up the local storage.
   */
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}

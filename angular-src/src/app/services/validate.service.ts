import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor(
    private http:Http
  ) { }

  /**
   * To judge that whether the register information for a user is correct or not null.
   * @param user: json type register information for a user.
   */
  validateRegister(user) {
    if (user.name == undefined || user.department == undefined || user.department == "Select your department...") {
      return false;
    } else {
      return true;
    }
  }

  getOperators() {
    let headers = new Headers();
    return this.http.get('http://localhost:3000/operators/getoperators', {headers: headers})
    // return this.http.post('roles/addrole', role, {headers: headers})
      .pipe(map(res => res.json()));
  }

  getRemoteOperators(remoteReq) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://10.253.7.14:8000', remoteReq, {headers: headers})
    .pipe(map(res => res.json()));
  }

  grabOperators () {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/operators/graboperators', {headers: headers})
      .pipe(map(res => res.json()));
  }

  createOperators(create) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://10.253.7.14:8000', create, {headers: headers})
      .pipe(map(res => res.json()));
  }

  addOperators(operator) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/operators/addoperator', operator, {headers: headers})
    // return this.http.post('roles/addrole', role, {headers: headers})
      .pipe(map(res => res.json()));
  }

  searchByName(name) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/operators/searchbyname', name, {headers: headers})
      .pipe(map(res => res.json()));
  }
}

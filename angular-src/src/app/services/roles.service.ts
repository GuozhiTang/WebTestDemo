import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  // properties
  roles: any;
  name: any;

  constructor(
    private http:Http
  ) { }

  // Function to get all roles locally
  getRoles() {
    let headers = new Headers();
    return this.http.get('http://localhost:3000/roles/getroles', {headers: headers})
      .pipe(map(res => res.json()));
  }

  // Function to get all roles remotely
  getremoteRoles() {
    let headers = new Headers();
    return this.http.get('http://10.253.7.14:8000/?request=getRoles', {headers: headers})
      .pipe(map(res => res.json()));
  }

  // Function to add role to the roles
  addRole(roles) {
    // Set header values
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/roles/addroles', roles, {headers: headers})
      .pipe(map(res => res.json()));
  }

  // Function to grab roles remotely
  grabRoles () {
    // Set header values
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/roles/grabroles', {headers: headers})
      .pipe(map(res => res.json()));
  }

  searchRolesByRole(rolename) {
    // this.searchUrl = 'https://api.spotify.com/v1/search?query='+str+'&offset=0&limit=20&type='+type+'&market=US';
    // return this.http.get(this.searchUrl)
    //   .pipe(map(res => res.json()));
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/roles/searchbyrole', rolename, {headers: headers})
      .pipe(map(res => res.json()));
  }

  searchRolesByModuleName(moduleName) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/roles/searchbymodulename', moduleName, {headers: headers})
      .pipe(map(res => res.json()));
  }

  searchRolesById(id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/roles/searchbyid', id, {headers: headers})
      .pipe(map(res => res.json()));
  }

  searchRolesByConditions(conditions) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/roles/searchbyconditions', conditions, {headers: headers})
      .pipe(map(res => res.json()));
  }
}

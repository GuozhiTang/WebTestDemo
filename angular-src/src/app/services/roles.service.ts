import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(
    private http:Http
  ) { }

  /**
   * Function to get all roles locally
   */
  getRoles() {
    let headers = new Headers();
    return this.http.get('http://localhost:3000/roles/getroles', {headers: headers})
    // return this.http.get('roles/getroles', {headers: headers})
      .pipe(map(res => res.json()));
  }

  /**
   * Function to get all roles remotely
   */
  getremoteRoles() {
    let headers = new Headers();
    return this.http.get('http://10.253.7.14:8000/?request=getRoles', {headers: headers})
      .pipe(map(res => res.json()));
  }

  createRoles(create) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://10.253.7.14:8000', create, {headers: headers})
      .pipe(map(res => res.json()));
  }

  /**
   * Function to add role to the roles
   * @param role: json sent to local server conatining all information for adding new Roles
   */
  addRole(role) {
    // Set header values
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/roles/addrole', role, {headers: headers})
    // return this.http.post('roles/addrole', role, {headers: headers})
      .pipe(map(res => res.json()));
  }

  /**
   * Function to grab roles remotely
   */
  grabRoles () {
    // Set header values
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/roles/grabroles', {headers: headers})
    // return this.http.post('roles/grabroles', {headers: headers})
      .pipe(map(res => res.json()));
  }

  /**
   * Search Roles by Role
   * @param rolename: json sent to local server conatining roleName
   */
  searchRolesByRole(rolename) {
    // this.searchUrl = 'https://api.spotify.com/v1/search?query='+str+'&offset=0&limit=20&type='+type+'&market=US';
    // return this.http.get(this.searchUrl)
    //   .pipe(map(res => res.json()));
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/roles/searchbyrole', rolename, {headers: headers})
    // return this.http.post('roles/searchbyrole', rolename, {headers: headers})
      .pipe(map(res => res.json()));
  }

  /**
   * Search Roles by Liquid_class
   * @param liquid_class: json sent to local server conatining liquid_class
   */
  searchRolesByLiquidClass(liquid_class) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/roles/searchbyliquidclass', liquid_class, {headers: headers})
    // return this.http.post('roles/searchbyliquidclass', liquid_class, {headers: headers})
      .pipe(map(res => res.json()));
  }

  /**
   * Search Roles by Roles_id
   * @param id: json sent to local server conatining role_id
   */
  searchRolesById(id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/roles/searchbyid', id, {headers: headers})
    // return this.http.post('roles/searchbyid', id, {headers: headers})
      .pipe(map(res => res.json()));
  }

  /**
   * Search Roles by both role and liquid_class
   * @param conditions: json sent to local server conatining role and liquid_class
   */
  searchRolesByConditions(conditions) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/roles/searchbyconditions', conditions, {headers: headers})
    // return this.http.post('roles/searchbyconditions', conditions, {headers: headers})
      .pipe(map(res => res.json()));
  }
}

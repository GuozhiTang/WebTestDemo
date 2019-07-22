import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LabwarespecsService {

  constructor(
    private http:Http
  ) { }

  /**
   * Function to get all labwarespecs locally
   */
  // getLabwareSpecs() {
  //   let headers = new Headers();
  //   return this.http.get('http://localhost:3000/labwarespecs/getlwarespec', {headers: headers})
  //   // return this.http.get('labwarespecs/getlwarespec', {headers: headers})
  //     .pipe(map(res => res.json()));
  // }

  /**
   * Function to get all labwarespecs remotely
   */
  // getremoteLabwareSpecs() {
  //   let headers = new Headers();
  //   return this.http.get('http://10.253.7.14:8000/?request=getLabwareSpecs', {headers: headers})
  //     .pipe(map(res => res.json()));
  // }

  // createLabwareSpec(create) {
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.post('http://10.253.7.14:8000', create, {headers: headers})
  //     .pipe(map(res => res.json()));
  // }

  /**
   * Function to add labwarespec to the labwarespecs
   * @param lwarespec: json sent to local server conatining all information for adding new Labwarespec
   */
  // addLabwareSpec(lwarespec) {
  //   // Set header values
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.post('http://localhost:3000/labwarespecs/addlwarespec', lwarespec, {headers: headers})
  //   // return this.http.post('labwarespecs/addlwarespec', lwarespec, {headers: headers})
  //     .pipe(map(res => res.json()));
  // }

  /**
   * Function to grab labwarespecs remotely
   */
  // resetLabwareSpecs () {
  //   // Set header values
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.post('http://localhost:3000/labwarespecs/resetLabwareSpecs', {headers: headers})
  //   // return this.http.post('labwarespecs/grablabwareSpecs', {headers: headers})
  //     .pipe(map(res => res.json()));
  // }

  /**
   * Search Labwarespecs by Name
   * @param name: json sent to local server conatining name
   */
  // searchLwarespecsByName(name) {
  //   // this.searchUrl = 'https://api.spotify.com/v1/search?query='+str+'&offset=0&limit=20&type='+type+'&market=US';
  //   // return this.http.get(this.searchUrl)
  //   //   .pipe(map(res => res.json()));
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.post('http://localhost:3000/labwarespecs/searchbyname', name, {headers: headers})
  //   // return this.http.post('labwarespecs/searchbyname', name, {headers: headers})
  //     .pipe(map(res => res.json()));
  // }

  /**
   * Search Labwarespecs by Manufacturer
   * @param manufacturer: json sent to local server conatining manufacturer
   */
  // searchLwarespecsByManufacturer(manufacturer) {
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.post('http://localhost:3000/labwarespecs/searchbymanufacturer', manufacturer, {headers: headers})
  //   // return this.http.post('labwarespecs/searchbymanufacturer', manufacturer, {headers: headers})
  //     .pipe(map(res => res.json()));
  // }

  /**
   * Search Labwarespecs by Labwarespecs_id
   * @param id: json sent to local server conatining Labwarespecs_id
   */
  // searchLwarespecsById(id) {
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.post('http://localhost:3000/labwarespecs/searchbyid', id, {headers: headers})
  //   // return this.http.post('labwarespecs/searchbyid', id, {headers: headers})
  //     .pipe(map(res => res.json()));
  // }

  /**
   * Search Labwarespecs by both name and manufacturer
   * @param conditions: json sent to local server conatining name and manufacturer.
   */
  // searchLwarespecsByConditions(conditions) {
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.post('http://localhost:3000/labwarespecs/searchbyconditions', conditions, {headers: headers})
  //   // return this.http.post('labwarespecs/searchbyconditions', conditions, {headers: headers})
  //     .pipe(map(res => res.json()));
  // }
}

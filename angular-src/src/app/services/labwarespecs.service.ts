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

  // Function to get all labwarespecs locally
  getLabwareSpecs() {
    let headers = new Headers();
    return this.http.get('http://localhost:3000/labwarespecs/getlwarespec', {headers: headers})
      .pipe(map(res => res.json()));
  }

  // Function to get all labwarespecs remotely
  getremoteLabwareSpecs() {
    let headers = new Headers();
    return this.http.get('http://10.253.7.14:8000/?request=getLabwareSpecs', {headers: headers})
      .pipe(map(res => res.json()));
  }

  // Function to add labwarespec to the labwarespecs
  addLabwareSpec(lwarespec) {
    // Set header values
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/labwarespecs/addlwarespec', lwarespec, {headers: headers})
      .pipe(map(res => res.json()));
  }

  // Function to grab labwarespecs remotely
  grabLabwareSpecs () {
    // Set header values
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/labwarespecs/grablabwareSpecs', {headers: headers})
      .pipe(map(res => res.json()));
  }

  searchLwarespecsByName(name) {
    // this.searchUrl = 'https://api.spotify.com/v1/search?query='+str+'&offset=0&limit=20&type='+type+'&market=US';
    // return this.http.get(this.searchUrl)
    //   .pipe(map(res => res.json()));
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/labwarespecs/searchbyname', name, {headers: headers})
      .pipe(map(res => res.json()));
  }

  searchLwarespecsByManufacturer(manufacturer) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/labwarespecs/searchbymanufacturer', manufacturer, {headers: headers})
      .pipe(map(res => res.json()));
  }

  searchLwarespecsById(id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/labwarespecs/searchbyid', id, {headers: headers})
      .pipe(map(res => res.json()));
  }

  searchLwarespecsByConditions(conditions) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/labwarespecs/searchbyconditions', conditions, {headers: headers})
      .pipe(map(res => res.json()));
  }
}

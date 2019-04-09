import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpecsService {

  // properties
  specs: any;
  name: any;

  constructor(
    private http:Http
  ) { }

  // Function to get all specs locally
  getSpecs() {
    let headers = new Headers();
    return this.http.get('http://localhost:3000/specs/getspecs', {headers: headers})
      .pipe(map(res => res.json()));
  }

  // Function to get all specs remotely
  getremoteSpecs() {
    let headers = new Headers();
    return this.http.get('http://10.253.7.14:8000/?request=getSpecs', {headers: headers})
      .pipe(map(res => res.json()));
  }

  // Function to add spec to the specs
  addSpec(specs) {
    // Set header values
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/specs/addspecs', specs, {headers: headers})
      .pipe(map(res => res.json()));
  }

  // Function to grab specs remotely
  grabSpecs () {
    // Set header values
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/specs/grabspecs', {headers: headers})
      .pipe(map(res => res.json()));
  }

  searchSpecsByName(name) {
    // this.searchUrl = 'https://api.spotify.com/v1/search?query='+str+'&offset=0&limit=20&type='+type+'&market=US';
    // return this.http.get(this.searchUrl)
    //   .pipe(map(res => res.json()));
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/specs/searchbyname', name, {headers: headers})
      .pipe(map(res => res.json()));
  }

  searchSpecsByModuleName(moduleName) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/specs/searchbymodulename', moduleName, {headers: headers})
      .pipe(map(res => res.json()));
  }

  searchSpecsById(id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/specs/searchbyid', id, {headers: headers})
      .pipe(map(res => res.json()));
  }

  searchSpecsByConditions(conditions) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/specs/searchbyconditions', conditions, {headers: headers})
      .pipe(map(res => res.json()));
  }
}

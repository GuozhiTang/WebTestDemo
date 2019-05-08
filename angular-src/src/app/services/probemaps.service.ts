import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProbemapsService {

  constructor(
    private http:Http
  ) { }

  // Function to get all probemaps locally
  getProbemaps() {
    let headers = new Headers();
    return this.http.get('http://localhost:3000/probemaps/getProbemaps', {headers: headers})
      .pipe(map(res => res.json()));
  }

  // Function to get all probemaps remotely
  getremoteProbemaps() {
    let headers = new Headers();
    return this.http.get('http://10.253.7.14:8000/?request=getAllProbemaps', {headers: headers})
      .pipe(map(res => res.json()));
  }

  // Function to add probemap to the probemaps
  addProbemap(probemaps) {
    // Set header values
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/probemaps/addProbemap', probemaps, {headers: headers})
      .pipe(map(res => res.json()));
  }

  // Function to grab probemaps remotely
  grabProbemaps () {
    // Set header values
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/probemaps/grabProbemaps', {headers: headers})
      .pipe(map(res => res.json()));
  }

  searchProbemapsBymoduleName(moduleName) {
    // this.searchUrl = 'https://api.spotify.com/v1/search?query='+str+'&offset=0&limit=20&type='+type+'&market=US';
    // return this.http.get(this.searchUrl)
    //   .pipe(map(res => res.json()));
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/probemaps/searchbymoduleName', moduleName, {headers: headers})
      .pipe(map(res => res.json()));
  }

  searchProbemapsByName(name) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/probemaps/searchbyname', name, {headers: headers})
      .pipe(map(res => res.json()));
  }

  searchProbemapsById(id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/probemaps/searchbyid', id, {headers: headers})
      .pipe(map(res => res.json()));
  }

  searchProbemapsByConditions(conditions) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/probemaps/searchbyconditions', conditions, {headers: headers})
      .pipe(map(res => res.json()));
  }

  searchProbemapsByCreator(creatorname) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/probemaps/searchbycreatorname', creatorname, {headers: headers})
      .pipe(map(res => res.json()));
  }

  // showProbes() {
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.post('http://127.0.0.1:3000/probes/showProbes', {headers: headers})
  //     .pipe(map(res => res.json()));
  // }

  // showProbes2() {
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.post('http://10.253.7.14:8000', {headers: headers})
  //     .pipe(map(res => res.json()));
  // }
}

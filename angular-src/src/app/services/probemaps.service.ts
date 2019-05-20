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

  /**
   * Function to get all probemaps locally
   */
  getProbemaps() {
    let headers = new Headers();
    return this.http.get('http://localhost:3000/probemaps/getProbemaps', {headers: headers})
      .pipe(map(res => res.json()));
  }

  /**
   * Function to get all probemaps remotely
   */
  getremoteProbemaps() {
    let headers = new Headers();
    return this.http.get('http://10.253.7.14:8000/?request=getAllProbemaps', {headers: headers})
      .pipe(map(res => res.json()));
  }

  /**
   * Function to add probemap to the probemaps
   * @param probemaps: json sent to local server conatining all information for adding new probemaps
   */
  addProbemap(probemaps) {
    // Set header values
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/probemaps/addProbemap', probemaps, {headers: headers})
      .pipe(map(res => res.json()));
  }

  /**
   * Function to grab probemaps remotely
   */
  grabProbemaps () {
    // Set header values
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/probemaps/grabProbemaps', {headers: headers})
      .pipe(map(res => res.json()));
  }

  /**
   * Search Probemaps by moduleName
   * @param moduleName: json sent to local server conatining moduleName
   */
  searchProbemapsBymoduleName(moduleName) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/probemaps/searchbymoduleName', moduleName, {headers: headers})
      .pipe(map(res => res.json()));
  }

  /**
   * Search Probemaps by Name
   * @param name: json sent to local server conatining name
   */
  searchProbemapsByName(name) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/probemaps/searchbyname', name, {headers: headers})
      .pipe(map(res => res.json()));
  }

  /**
   * Search Probemaps by probemaps_id
   * @param id: json sent to local server conatining probemaps_id
   */
  searchProbemapsById(id) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/probemaps/searchbyid', id, {headers: headers})
      .pipe(map(res => res.json()));
  }

  /**
   * Search Probemaps by both moduleName and Name
   * @param conditions: json sent to local server conatining moduleName and name
   */
  searchProbemapsByConditions(conditions) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/probemaps/searchbyconditions', conditions, {headers: headers})
      .pipe(map(res => res.json()));
  }

  /**
   * Search Probemaps by creatorName
   * @param creatorname: json sent to local server conatining creatorName
   */
  searchProbemapsByCreator(creatorname) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/probemaps/searchbycreatorname', creatorname, {headers: headers})
      .pipe(map(res => res.json()));
  }

  /**
   * Search and show probes according to specific Probemao_id
   * @param mapId: json sent to local server conatining probemap_id
   */
  showProbes3(mapId) {
    let headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    return this.http.post('http://127.0.0.1:3000/probes/showProbes', mapId, {headers: headers})
    .pipe(map(res => res.json()));
  }
}
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlateService {

  constructor(
    private http:Http
  ) { }

  clickTube() {
    const tube = {
      id: "12345",
      name: "testtube",
      coor: "A2",
      volume: "12mL",
      description: "test 12mL tube"
    }
    return tube;
  }

  getPlates() {
    let headers = new Headers();
    return this.http.get('http://localhost:3000/plates/getplates', {headers: headers})
      .pipe(map(res => res.json()));
  }

  searchPlatesByCoor(coor) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/plates/searchbycoor', coor, {headers: headers})
      .pipe(map(res => res.json()));
  }
}

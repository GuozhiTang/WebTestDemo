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

  // getPlates() {
  //   let headers = new Headers();
  //   return this.http.get('http://localhost:3000/plates/getplates', {headers: headers})
  //   // return this.http.get('plates/getplates', {headers: headers})
  //     .pipe(map(res => res.json()));
  // }

  // searchPlatesByCoor(coor) {
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.post('http://localhost:3000/plates/searchbycoor', coor, {headers: headers})
  //   // return this.http.post('plates/searchbycoor', coor, {headers: headers})
  //     .pipe(map(res => res.json()));
  // }

  // searchPlateByBar(barcode) {
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/json');
  //   return this.http.post('http://127.0.0.1:3000/plates/searchbybarcode', barcode, {headers: headers})
  //   // return this.http.post('plates/searchbybarcode', barcode, {headers: headers})
  //     .pipe(map(res => res.json()));
  // }
}

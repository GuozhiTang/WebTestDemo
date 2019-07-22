import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { map } from 'rxjs/operators';
import { RoutesRecognized } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: Http
  ) { }

  getData(component) {
    let headers = new Headers();
    var routes;
    switch (component) {
      case 'Instrument': routes = 'instruments/getInstruments'; break;
    }
    return this.http.get('http://localhost:3000/' + routes, {headers: headers})
      .pipe(map(res => res.json()));
  }

  getInstruments() {
    let headers = new Headers();
    return this.http.get('http://localhost:3000/instruments/getInstruments', {headers: headers})
    // return this.http.get('instruments/getInstruments', {headers: headers})
      .pipe(map(res => res.json()));
  }
}

import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WorkorderService {

  constructor(
    private http:Http
  ) { }

  uploadMatrixTube(matrixtube) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://10.253.7.14:8000', matrixtube, {headers: headers})
      .pipe(map(res => res.json()));
  }

  getWorkorderId() {
    let headers = new Headers();
    return this.http.get('http://10.253.7.14:8000/?request=fpAntibodyMatrixReq', {headers: headers})
      .pipe(map(res => res.json()));
  }

  storeMatrixTube(storeData) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://10.253.7.14:8000', storeData, {headers: headers})
      .pipe(map(res => res.json()));
  }
}

import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RemotereqService {

  constructor(
    private http: Http
  ) { }

  remotePostReq (req) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://10.253.7.14:8000', req, {headers: headers})
      .pipe(map(res => res.json()));
  }
}

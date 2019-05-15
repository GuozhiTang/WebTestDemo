import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProcessService {

  constructor(
    private http:Http
  ) { }

  getremoteRequests() {
    let headers = new Headers();
    return this.http.get('http://10.253.7.14:8000/?request=fireplexGetAllReq', {headers: headers})
      .pipe(map(res => res.json()));
  }

  getRequests(getReq) {
    // console.log(getReq);
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://10.253.7.14:8000', getReq, {headers: headers})
      .pipe(map(res => res.json()));
  }

  getByReqId(ReqId) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://10.253.7.14:8000', ReqId, {headers: headers})
      .pipe(map(res => res.json()));
  }
}

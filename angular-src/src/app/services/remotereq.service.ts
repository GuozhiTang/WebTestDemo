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

  /**
   * Method of connecting with the data server
   * Post Request will be sent to the data server with specific content or requestHandler
   * @param req Json-type request or requestHandler which will be sent to the data server
   */
  remotePostReq (req) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://10.253.7.14:8000', req, {headers: headers})
      .pipe(map(res => res.json()));
  }
}

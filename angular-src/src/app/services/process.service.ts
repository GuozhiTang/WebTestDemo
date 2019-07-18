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

  /**
   * Get requests (work-orders) by request type
   * @param getReq: json sent to data server containing request type
   */
  // getRequests(getReq) {
  //   // console.log(getReq);
  //   let headers = new Headers();
  //   headers.append('Content-Type','application/json');
  //   return this.http.post('http://10.253.7.14:8000', getReq, {headers: headers})
  //     .pipe(map(res => res.json()));
  // }

  /**
   * Get request items by request ID
   * @param ReqId: json sent to data server containing reqest Id
   */
  // getByReqId(ReqId) {
  //   let headers = new Headers();
  //   headers.append('Content-Type','application/json');
  //   return this.http.post('http://10.253.7.14:8000', ReqId, {headers: headers})
  //     .pipe(map(res => res.json()));
  // }

  /**
   * Show status according to the request Id
   * @param showComment: json sent to data server containing request Id
   */
  // showStatus(showComment) {
  //   let headers = new Headers();
  //   headers.append('Content-Type','application/json');
  //   return this.http.post('http://10.253.7.14:8000', showComment, {headers: headers})
  //     .pipe(map(res => res.json()));
  // }

  /**
   * Get all types of status
   * @param info: json sent to data server to get all types
   */
  // getStatusTypes(info) {
  //   let headers = new Headers();
  //   headers.append('Content-Type','application/json');
  //   return this.http.post('http://10.253.7.14:8000', info, {headers: headers})
  //     .pipe(map(res => res.json()));
  // }

  /**
   * Add new status for updates
   * @param comment: json sent to data server containing comments and other information
   */
  // addStatus(comment) {
  //   let headers = new Headers();
  //   headers.append('Content-Type','application/json');
  //   return this.http.post('http://10.253.7.14:8000', comment, {headers: headers})
  //     .pipe(map(res => res.json()));
  // }
}

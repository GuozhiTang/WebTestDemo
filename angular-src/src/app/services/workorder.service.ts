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

  /**
   * Function to get the details of work-order
   * @param matrixtube json sent to remote server conatining work-order id and scanned data
   */
  uploadMatrixTube(matrixtube) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://10.253.7.14:8000', matrixtube, {headers: headers})
      .pipe(map(res => res.json()));
  }

  /**
   * Function to get the list of work-order ids
   */
  getWorkorderId() {
    let headers = new Headers();
    return this.http.get('http://10.253.7.14:8000/?request=fpAntibodyMatrixReq', {headers: headers})
      .pipe(map(res => res.json()));
  }

  /**
   * Function to submit and store the data onto the remote server
   * @param storeData json sent to remote server conatining work-order id and scanned data
   */
  storeMatrixTube(storeData) {
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post('http://10.253.7.14:8000', storeData, {headers: headers})
      .pipe(map(res => res.json()));
  }
}

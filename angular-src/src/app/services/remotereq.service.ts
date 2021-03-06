/*
 * @Description: The remote request server is to handle all the requests for remote data server
 * @Author: Guozhi Tang
 * @Date: 2019-07-19 14:00:28
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-30 14:39:39
 */
import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { map } from 'rxjs/operators';
import { testServer } from '../testServer';

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
    console.log(req);
    headers.append('Content-Type', 'application/json');
    return this.http.post(testServer + 'remotes/postReq', req, {headers: headers})
      .pipe(map(res => res.json()));
  }

  /**
   * Method of retrieving data from the data server
   * One way is to send string-type request handler
   * Another way is to send a json request with specific data 
   * @param req Json-type request or string-type requestHandler which will be sent to the data server
   */
  retrievalData(req) {
    var retrievalData;
    if (typeof(req) == 'string') {
      retrievalData = {
        request: req
      }
    } else {
      retrievalData = {
        request: "fireplexCoreDaoRetrieval",
        coreDaoReqData: req
      }
    }
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(testServer + 'remotes/retrievalData', retrievalData, {headers: headers})
      .pipe(map(res => res.json()));
  }

  /**
   * Method of creating data in data server
   * @param coreDao Specific model data of the created component
   * @param pKey Primary key of created component, always be a number such as id
   * @param searchKey To search by this parameter in the database in order to check whether it is existed already
   */
  createData(coreDao, pKey, searchKey) {
    // console.log(coreDao);
    const createData = {
      request: "fireplexCoreDaoCreation",
      coreDaoReqData: {
        coreDao: coreDao,
        pKey: pKey,
        searchKey: searchKey,
      }
    }
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(testServer + 'remotes/createData', createData, {headers: headers})
      .pipe(map(res => res.json()));
  }

  /**
   * Method of returning coreDaoReqData for retrieving data
   * @param className String type to specify the className, which is what we are searching for
   * @param colNames Array type to specify the conditions of search, which means search by what parameters
   * @param moduleName String type to specify the moduleName
   * @param loadAll Boolean type to specify whether is needed to load all information
   */
  getCoreDaoReqData(className, colNames, moduleName, loadAll) {
    const coreDaoReqData = {
      attrName: "id",
      colNames: colNames,
      coreDao: {
        id: null,
        className: className,
        moduleName: moduleName
      },
      dataRange: {},
      loadAll: loadAll
    }
    return coreDaoReqData;
  }
}
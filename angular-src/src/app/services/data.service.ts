/*
 * @Description: The data service for handle all the operations for local database
 * @Author: Guozhi Tang
 * @Date: 2019-07-22 09:26:14
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-30 14:38:34
 */
import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { map } from 'rxjs/operators';
import { testServer } from '../testServer';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: Http
  ) { }

  /**
   * Send a get request to the server for a set of data
   * @param component Specify the component that this method applying to
   */
  getData(component) {
    let headers = new Headers();
    var route;
    switch (component) {
      case 'Instrument': route = 'instruments/getInstruments'; break;
      case 'Operator': route = 'operators/getoperators'; break;
      case 'Role': route = 'roles/getroles'; break;
      case 'LabwareSpec': route = 'labwarespecs/getlwarespec'; break;
      case 'Probemap': route = 'probemaps/getProbemaps'; break;
      case 'Plate': route = 'plates/getplates'; break;
      case 'Spec': route = 'specs/getspecs'; break;
      case 'OperatorDept': route= 'operatordepts/getoperatordepts'; break;
    }
    return this.http.get(testServer + route, {headers: headers})
      .pipe(map(res => res.json()));
  }

  /**
   * Send a post reqeust to the server to add new data to the specific collection
   * @param component Specify the component that this method applying to
   * @param addData Specify the json-type data which will be added to the specific collenction
   */
  addData(component, addData) {
    let headers = new Headers();
    var route;
    switch (component) {
      case 'Operator': route = 'operators/addoperator'; break;
      case 'Role': route = 'roles/addrole'; break;
      case 'Instrument': route = 'instruments/addInstrument'; break;
      case 'LabwareSpec': route = 'labwarespecs/addlwarespec'; break;
      case 'OperatorDept': route = 'operatordepts/addoperatordept'; break;
      // case 'Probemap': route = 'probemaps/addProbemap'; break;
      // case 'Spec': route = 'specs/addspecs'; break;
    }
    headers.append('Content-Type', 'application/json');
    return this.http.post(testServer + route, addData, {headers: headers})
      .pipe(map(res => res.json()));
  }

  /**
   * Send a post request to the server to
   * 1.drop the specific collection 
   * 2.grab the specific collection from the data server
   * which means to reset the specific collection
   * @param component Specify the component that this method applying to
   */
  resetData(component) {
    let headers = new Headers();
    var route;
    switch (component) {
      case 'Operator': route = 'operators/resetOperators'; break;
      case 'Role': route = 'roles/resetroles'; break;
      case 'Instrument': route = 'instruments/resetInstruments'; break;
      case 'LabwareSpec': route = 'labwarespecs/resetLabwareSpecs'; break;
      case 'Probemap': route = 'probemaps/resetProbemaps'; break;
      case 'Spec': route = 'specs/resetspecs'; break;
      case 'OperatorDept': route = 'operatordepts/resetoperatordepts'; break;
    }
    headers.append('Content-Type', 'application/json');
    return this.http.post(testServer + route, {headers: headers})
      .pipe(map(res => res.json()));
  }

  /**
   * Send a post request to the server to search for exact data according to the searchData
   * @param component Specify the component that this method applying to
   * @param searchData Specify the json-type data which will be set as the search resource
   */
  searchData(component, searchData) {
    let headers = new Headers();
    var route;
    switch (component) {
      case 'Operator_name': route = 'operators/searchbyname'; break;
      case 'Role_role': route = 'roles/searchbyrole'; break;
      case 'Role_liquidClass': route = 'roles/searchbyliquidclass'; break;
      case 'Role_id': route = 'roles/searchbyid'; break;
      case 'Role_conditions': route = 'roles/searchbyconditions'; break;
      case 'Instrument_moduleName': route = 'instruments/searchbymoduleName'; break;
      case 'Instrument_short': route = 'instruments/searchbyshort'; break;
      case 'Instrument_id': route = 'instruments/searchbyid'; break;
      case 'Instrument_conditions': route = 'instruments/searchbyconditions'; break;
      case 'LabwareSpec_name': route = 'labwarespecs/searchbyname'; break;
      case 'LabwareSpec_manufacturer': route = 'labwarespecs/searchbymanufacturer'; break;
      case 'LabwareSpec_id': route = 'labwarespecs/searchbyid'; break;
      case 'LabwareSpec_conditions': route = 'labwarespecs/searchbyconditions'; break;
      case 'Probemap_moduleName': route = 'probemaps/searchbymoduleName'; break;
      case 'Probemap_name': route = 'probemaps/searchbyname'; break;
      case 'Probemap_id': route = 'probemaps/searchbyid'; break;
      case 'Probemap_conditions': route = 'probemaps/searchbyconditions'; break;
      case 'Probemap_creator': route = 'probemaps/searchbycreatorname'; break;
      case 'Probemap_probemapId': route = 'probes/showProbes'; break;
      case 'Plate_barcode': route = 'plates/searchbybarcode'; break;
      case 'Plate_coor': route = 'plates/searchbycoor'; break;
      case 'Spec_name': route = 'specs/searchbyname'; break;
      case 'Spec_moduleName': route = 'specs/searchbymodulename'; break;
      case 'Spec_id': route = 'specs/searchbyid'; break;
      case 'Spec_conditions': route = 'specs/searchbyconditions'; break;
    }
    headers.append('Content-Type', 'application/json');
    return this.http.post(testServer + route, searchData, {headers: headers})
      .pipe(map(res => res.json()));
  }
}
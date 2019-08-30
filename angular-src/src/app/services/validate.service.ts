/*
 * @Description: The validate service is to handle all the validations
 * @Author: Guozhi Tang
 * @Date: 2019-04-09 14:00:28
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-30 15:12:34
 */
import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor(
    private http:Http
  ) { }

  /**
   * To judge that whether the register information for a user is correct or not null
   * @param user json type register information for a user
   */
  validateRegister(user) {
    if (user.name == undefined || user.department == undefined || user.department == "Select your department...") {
      return false;
    } else {
      return true;
    }
  }
}
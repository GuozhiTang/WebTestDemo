import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  /**
   * To judge that whether the register information for a user is correct or not null.
   * @param user: json type register information for a user.
   */
  validateRegister(user) {
    if (user.name == undefined || user.department == undefined || user.department == "Select your department...") {
      return false;
    } else {
      return true;
    }
  }
}

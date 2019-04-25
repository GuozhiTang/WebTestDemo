import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(user) {
    if (user.name == undefined || user.department == undefined || user.department == "Select your department...") {
      return false;
    } else {
      return true;
    }
  }
}

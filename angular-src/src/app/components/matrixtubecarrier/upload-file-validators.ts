/*
 * @Description: In order to test the type of uploaded file
 * @Author: Guozhi Tang
 * @Date: 2019-07-19 14:00:28
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-30 14:20:34
 */
import { FormControl } from '@angular/forms';

export function requiredFileType( type: string ) {
  return function ( control: FormControl ) {
    const file = control.value;
    if ( file ) {
      // console.log(file.name);
      const extension = file.name.split('.')[1].toLowerCase();
      if ( type.toLowerCase() !== extension.toLowerCase() ) {
        return {
          requiredFileType: true
        };
      }

      return null;
    }

    return null;
  };
}
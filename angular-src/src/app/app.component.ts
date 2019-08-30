/*
 * @Description: Main web application structural page
 * @Author: Guozhi Tang
 * @Date: 2019-04-09 14:00:28
 * @Github: https://github.com/GuozhiTang/Bio-WebApp
 * @LastEditors: Guozhi Tang
 * @LastEditTime: 2019-08-30 15:11:38
 */
// Bring in main angular package
import { Component } from '@angular/core';

@Component({
  // HTML tag we can use to insert the component
  selector: 'app-root',
  // html file which is associate with the component
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-src';
}
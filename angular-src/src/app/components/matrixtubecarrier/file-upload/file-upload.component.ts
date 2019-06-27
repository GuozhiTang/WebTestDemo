import { Component, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadComponent,
      multi: true
    }
  ],
  styleUrls: ['./file-upload.component.css']
})
export class FileUploadComponent implements ControlValueAccessor {
  @Input() progress;
  onChange: Function;
  private file: File | null = null;
  content: String;

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
    
    // Set "this" as object in order to use it inside of function onload()
    var object = this;
    var reader = new FileReader();
    reader.onload = function(evt) {
      var content = (<FileReader>evt.target).result;
      // console.log(typeof(content));
      object.setContent(content);
    };
    reader.readAsText(this.file);
  }

  constructor( private host: ElementRef<HTMLInputElement> ) {
  }

  setContent (content) {
    this.content = content;
    // console.log(this.content);
  }

  writeValue( value: null ) {
    // clear file input
    this.host.nativeElement.value = '';
    this.file = null;
  }

  registerOnChange( fn: Function ) {
    this.onChange = fn;
  }

  registerOnTouched( fn: Function ) {
  }
}
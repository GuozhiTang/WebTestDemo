import { HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { pipe } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { requiredFileType } from './upload-file-validators';
import { WorkorderService } from '../../services/workorder.service';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { AuthService } from '../../services/auth.service';
import { Workorder } from '../../../Workorder';
import { FlashMessagesService } from 'angular2-flash-messages';

export function uploadProgress<T>( cb: ( progress: number ) => void ) {
  return tap(( event: HttpEvent<T> ) => {
    if ( event.type === HttpEventType.UploadProgress ) {
      cb(Math.round((100 * event.loaded) / event.total));
    }
  });
}

export function toResponseBody<T>() {
  return pipe(
    filter(( event: HttpEvent<T> ) => event.type === HttpEventType.Response),
    map(( res: HttpResponse<T> ) => res.body)
  );
}

@Component({
  selector: 'app-matrixtubecarrier',
  templateUrl: './matrixtubecarrier.component.html',
  styleUrls: ['./matrixtubecarrier.component.css']
})
export class MatrixtubecarrierComponent {
  progress = 0;
  // control: FormControl;
  @ViewChild(FileUploadComponent) childUpload : FileUploadComponent;
  workorderids: BigInteger[];
  workorderid: BigInteger;
  workorders: Workorder[];
  user: {
    name: String;
    department: String;
  };

  signup = new FormGroup({
    workorderid: new FormControl(null, Validators.required),
    csv: new FormControl(null, [Validators.required, requiredFileType('csv')])
  });
  success = false;

  constructor(
    private http: HttpClient,
    private workorderService: WorkorderService,
    public authService:AuthService,
    private flashMessage:FlashMessagesService,
    ) {
      this.workorderService.getWorkorderId().subscribe(res => {
        this.workorderids = res.results;
      });
      this.authService.getProfile().subscribe(profile => {
        // console.log(profile);
        this.user = profile.user;
        // console.log(this.user);
      });
  }

  onSubmit() {
    // console.log(this.childUpload.content);
    // console.log(this.signup.value.workorderid);
    const matrixtube = {
      request: "fpAntibodyMatrixCarrierDet",
      // requestId: this.workorderid,
      requestId: this.signup.value.workorderid,
      scannedData: this.childUpload.content
    }

    this.workorderService.uploadMatrixTube(matrixtube).subscribe(res => {
      if (res) {
        this.workorders = res;
        // console.log(res);
        // console.log(this.workorders.antibodyName);
      } else {
        this.flashMessage.show('Selection cannot be empty or error exists!', {cssClass: 'alert-danger', timeout: 5000});
      }
    });
    
    // this.success = false;
    // if ( !this.signup.valid ) {
    //   markAllAsDirty(this.signup);
    //   return;
    // }
    
    // this.http.post('http://localhost:3000/workorders/matrixtubecarrier', toFormData(this.signup.value), {
    //   reportProgress: true,
    //   observe: 'events'
    // }).pipe(
    //   uploadProgress(progress => (this.progress = progress)),
    //   toResponseBody()
    // ).subscribe(res => {
    //   this.progress = 0;
    //   this.success = true;
    //   this.signup.reset();
    // });
  }

  onSubmit2(check) {
    if (check) {
      console.log('The 1st Submit!');
    } else {
      console.log('The 2nd Submit!');
    }
  }

  hasError( field: string, error: string ) {
    const control = this.signup.get(field);
    return control.dirty && control.hasError(error);
  }
}

export function markAllAsDirty( form: FormGroup ) {
  for ( const control of Object.keys(form.controls) ) {
    form.controls[control].markAsDirty();
  }
}

export function toFormData<T>( formValue: T ) {
  const formData = new FormData();

  for ( const key of Object.keys(formValue) ) {
    const value = formValue[key];
    formData.append(key, value);
  }

  return formData;
}





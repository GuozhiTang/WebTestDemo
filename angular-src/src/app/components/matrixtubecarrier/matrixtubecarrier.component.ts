import { HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { requiredFileType } from './upload-file-validators';
import { WorkorderService } from '../../services/workorder.service';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { AuthService } from '../../services/auth.service';
import { Workorder } from '../../../Workorder';
import { FlashMessagesService } from 'angular2-flash-messages';

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
  workorders: Workorder[];
  // workorderId: Workorder[];
  user: {
    name: String;
    department: String;
  };
  matchJudge: Boolean = true;
  signup = new FormGroup({
    workorderid: new FormControl(null, Validators.required),
    csv: new FormControl(null, [Validators.required, requiredFileType('csv')])
  });

  constructor(
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

    if ( !this.signup.valid ) {
      markAllAsDirty(this.signup);
      return;
    }
  }

  onSubmit2() {
    this.matchJudge = true;
    for (let workorder of this.workorders) {
      // console.log(workorder);
      if (workorder.match == false) {
        this.matchJudge = false;
        break;
      }
    }

    if (this.matchJudge) {
      const storeData = {
        request: "fpAntibodyMatrixCarrierReqData",
        // requestId: this.workorderid,
        requestId: this.signup.value.workorderid,
        scannedData: this.childUpload.content
      }
      
      this.workorderService.storeMatrixTube(storeData).subscribe(res => {
        // console.log(res);
        this.flashMessage.show(res, {cssClass: 'alert-success', timeout: 5000});
      });
    } else {
      this.flashMessage.show('Not Match! Cannot Store the Data!', {cssClass: 'alert-danger', timeout: 5000});
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
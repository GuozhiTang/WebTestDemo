import { Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { requiredFileType } from './upload-file-validators';
import { WorkorderService } from '../../services/workorder.service';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { AuthService } from '../../services/auth.service';
import { Workorder } from '../../../Workorder';
import { FlashMessagesService } from 'angular2-flash-messages';
import { RemotereqService } from '../../services/remotereq.service';

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
  signup = new FormGroup({
    workorderid: new FormControl(null, Validators.required),
    csv: new FormControl(null, [Validators.required, requiredFileType('csv')])
  });
  checkSubmit: Boolean = false;

  constructor(
    private workorderService: WorkorderService,
    public authService:AuthService,
    private flashMessage:FlashMessagesService,
    private remoteService: RemotereqService,
    ) {
      // Get the work-order id list here
      const getWorkorderId = {
        request: "fpAntibodyMatrixReq"
      }
      this.remoteService.remotePostReq(getWorkorderId).subscribe(res => {
        this.workorderids = res.results;
      });

      // Get the user information here
      this.authService.getProfile().subscribe(profile => {
        // console.log(profile);
        this.user = profile.user;
        // console.log(this.user);
      });
  }

  /**
   * First Submit -- In order to get the details of work-oder
   * Function to check the match results of details which will influence the active of second submit buttom
   * Only if all match results are true, the second submit buttom can become active, otherwise, it is disabled
   */
  onSubmit() {
    // console.log(this.childUpload.content);
    // console.log(this.signup.value.workorderid);
    const uploadMatrixTube = {
      request: "fpAntibodyMatrixCarrierDet",
      // requestId: this.workorderid,
      requestId: this.signup.value.workorderid,
      scannedData: this.childUpload.content
    }

    this.remoteService.remotePostReq(uploadMatrixTube).subscribe(res => {
      if (res) {
        this.workorders = res;
        console.log(res);
        // console.log(this.workorders.antibodyName);

        // Set the default status as active
        this.checkSubmit = true;
        for (let workorder of this.workorders) {
          // console.log(workorder.match);
          if (workorder.match == false) {
            this.checkSubmit = false;
            this.flashMessage.show('Not Match Completely!', {cssClass: 'alert-danger', timeout: 5000});
            break;
          }
        }
      } else {
        this.flashMessage.show('Selection cannot be empty or error exists!', {cssClass: 'alert-danger', timeout: 5000});
      }
    });

    // Keep the second submit button as disable every time we get a new deatils table
    // this.checkSubmit = false;

    if ( !this.signup.valid ) {
      markAllAsDirty(this.signup);
      return;
    }
  }

  /**
   * Second Submit -- When submit button is active, submit to store data in the remote server
   */
  onSubmit2() {
    const storeMatrixTube = {
      request: "fpAntibodyMatrixCarrierReqData",
      // requestId: this.workorderid,
      requestId: this.signup.value.workorderid,
      scannedData: this.childUpload.content
    }
    
    this.remoteService.remotePostReq(storeMatrixTube).subscribe(res => {
      console.log(res.results);
      if (res.results == null || res.results.length == 0) {
        this.flashMessage.show("Stored Successfully!", {cssClass: 'alert-success', timeout: 5000});
        window.location.href = "/matrixtubecarrier";
      } else {
        this.flashMessage.show(res.results, {cssClass: 'alert-danger', timeout: 5000});
      }
    });
  }

  /**
   * Function to check the match results of details which will influence the active of second submit buttom
   * Only if all match results are true, the second submit buttom can become active, otherwise, it is disabled
   */
  // checkSubmitFunc() {
  //   // Set the default status as active
  //   this.checkSubmit = true;
  //   for (let workorder of this.workorders) {
  //     // console.log(workorder.match);
  //     if (workorder.match == false) {
  //       this.checkSubmit = false;
  //       this.flashMessage.show('Not Match Completely!', {cssClass: 'alert-danger', timeout: 5000});
  //       break;
  //     }
  //   }
  // }

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
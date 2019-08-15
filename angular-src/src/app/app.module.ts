// Whenever create a component or service we should import them here
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
// import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SpecsComponent } from './components/specs/specs.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { RemotereqService } from './services/remotereq.service';

import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './guards/auth.guard';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { TransferComponent } from './components/transfer/transfer.component';
import { TargetplateComponent } from './components/transfer/targetplate/targetplate.component';
import { SourceplateComponent } from './components/transfer/sourceplate/sourceplate.component';
import { RemarksComponent } from './components/remarks/remarks.component';
import { RolesComponent } from './components/roles/roles.component';
import { LabwarespecsComponent } from './components/labwarespecs/labwarespecs.component';
import { InstrumentsComponent } from './components/instruments/instruments.component';
import { ProbemapsComponent } from './components/probemaps/probemaps.component';
import { ProcessComponent } from './components/process/process.component';
import { CodedilutionreqComponent } from './components/codedilutionreq/codedilutionreq.component';
import { MatrixtubecarrierreqComponent } from './components/matrixtubecarrier/matrixtubecarrierreq.component';
import { FileUploadComponent } from './components/matrixtubecarrier/file-upload/file-upload.component';
import { OperatorsComponent } from './components/operators/operators.component';
import { AdminComponent } from './components/admin/admin.component';
import { CodemixreqComponent } from './components/codemixreq/codemixreq.component';
import { InstrumentreqComponent } from './components/instrumentreq/instrumentreq.component';
import { TransferreqComponent } from './components/transferreq/transferreq.component';

const appRoutes: Routes = [
  // This could be the home page
  {path: '', component: HomeComponent},
  // {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path: 'specs', component: SpecsComponent, canActivate:[AuthGuard]},
  {path: 'transfer', component: TransferComponent, canActivate:[AuthGuard]},
  {path: 'transfer/targetplate', component: TargetplateComponent, canActivate:[AuthGuard]},
  {path: 'transfer/sourceplate', component: SourceplateComponent, canActivate:[AuthGuard]},
  {path: 'hint', component: RemarksComponent},
  {path: 'roles', component: RolesComponent, canActivate:[AuthGuard]},
  {path: 'labwarespecs', component: LabwarespecsComponent, canActivate:[AuthGuard]},
  {path: 'instruments', component: InstrumentsComponent, canActivate:[AuthGuard]},
  {path: 'probemaps', component: ProbemapsComponent, canActivate:[AuthGuard]},
  {path: 'process', component: ProcessComponent, canActivate:[AuthGuard]},
  {path: 'codedilutionreq', component: CodedilutionreqComponent, canActivate:[AuthGuard]},
  {path: 'matrixtubecarrier', component: MatrixtubecarrierreqComponent, canActivate:[AuthGuard]},
  {path: 'operators', component: OperatorsComponent, canActivate:[AuthGuard]},
  {path: 'fpadmin', component: AdminComponent, canActivate:[AuthGuard]},
  {path: 'codemixreq', component: CodemixreqComponent, canActivate:[AuthGuard]},
  {path: 'instrumentreq', component: InstrumentreqComponent, canActivate:[AuthGuard]},
  {path: 'transferreq', component: TransferreqComponent, canActivate:[AuthGuard]},
]

// id_token is from storeUserData(token, user) in auth.service.ts
export function tokenGetter() {
  return localStorage.getItem('id_token');
}

@NgModule({
  // All the components should be put into declarations
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    // RegisterComponent,
    HomeComponent,
    DashboardComponent,
    SpecsComponent,
    TransferComponent,
    TargetplateComponent,
    SourceplateComponent,
    RemarksComponent,
    RolesComponent,
    LabwarespecsComponent,
    InstrumentsComponent,
    ProbemapsComponent,
    ProcessComponent,
    CodedilutionreqComponent,
    MatrixtubecarrierreqComponent,
    FileUploadComponent,
    OperatorsComponent,
    AdminComponent,
    CodemixreqComponent,
    InstrumentreqComponent,
    TransferreqComponent,
  ],
  // Modules should be put into imports
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    // FlashMessagesModule
    FlashMessagesModule.forRoot(),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      },
    }),
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  // Services should be put into providers
  providers: [ValidateService, AuthService, AuthGuard, DataService, RemotereqService],
  bootstrap: [AppComponent]
})
export class AppModule { }
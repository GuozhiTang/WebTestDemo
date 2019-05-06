// Whenever create a component or service we should import them here
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SpecsComponent } from './components/specs/specs.component';
import { PlateComponent } from './components/plate/plate.component';
import { PlatelistComponent } from './components/platelist/platelist.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { SpecsService } from './services/specs.service';

import { JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './guards/auth.guard';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { TransferComponent } from './components/transfer/transfer.component';
import { TargetplateComponent } from './components/transfer/targetplate/targetplate.component';
import { SourceplateComponent } from './components/transfer/sourceplate/sourceplate.component';
import { HintComponent } from './components/hint/hint.component';

const appRoutes: Routes = [
  // This could be the home page
  {path:'', component: HomeComponent},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'dashboard', component: DashboardComponent, canActivate:[AuthGuard]},
  {path:'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path:'specs', component: SpecsComponent},
  {path:'plate', component: PlateComponent},
  {path:'platelist', component: PlatelistComponent},
  {path:'transfer', component: TransferComponent},
  {path:'transfer/targetplate', component: TargetplateComponent},
  {path:'transfer/sourceplate', component: SourceplateComponent},
  {path:'hint', component: HintComponent},
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
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    SpecsComponent,
    PlateComponent,
    PlatelistComponent,
    TransferComponent,
    TargetplateComponent,
    SourceplateComponent,
    HintComponent,
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
  ],
  // Services should be put into providers
  providers: [ValidateService, AuthService, AuthGuard, SpecsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

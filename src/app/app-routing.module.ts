import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { SellerDashboardComponent} from './seller-dashboard/seller-dashboard.component';
import { MainComponent } from './main/main.component';
import { ModelDetailsComponent } from './model/model-details/model-details.component';
import { SellerRegistrationComponent } from './authentication/seller-registration/seller-registration.component';
import { SellerLoginComponent } from './authentication/seller-login/seller-login.component';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { LoginComponent } from './authentication/login/login.component';
import { RenderComponent } from './model/render/render.component';
import { BrowseComponent } from './model/browse/browse.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { ManageModelComponent } from './model/manage-model/manage-model.component';
import { AddAssetComponent } from './model/add-asset/add-asset.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { UserloginGuard } from './guards/userlogin.guard';


const routes: Routes = [
  {path:'', redirectTo : '/app/login', pathMatch :'full'},
  {path:'home', component: HomeComponent},
  { path : 'app', component : MainComponent, children : [
    {path:'login', component: LoginComponent},
    {path:'register', component: RegistrationComponent},
    {path:'sellerLogin', component: SellerLoginComponent},
    {path:'sellerRegistration', component: SellerRegistrationComponent},
    {path:'resetPassword', component: ResetPasswordComponent},
    {path:'browse', component: BrowseComponent},
    {path:'render', component: RenderComponent},
    {path:'modelDetails/:id', component:ModelDetailsComponent}
  ]},
  {path:'user', component: UserDashboardComponent, canActivate: [UserloginGuard], children : [
    {path:'', component: ProfileComponent},
  ]},
  {path:'sellerdb', component: SellerDashboardComponent,canActivate: [UserloginGuard], children : [
    {path:'profile', component: ProfileComponent},
    {path:'manageModel', component: ManageModelComponent},
    {path:'addAsset', component: AddAssetComponent},
  ]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

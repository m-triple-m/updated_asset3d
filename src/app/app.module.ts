import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { LoginComponent } from './authentication/login/login.component';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';
import { RegistrationComponent } from './authentication/registration/registration.component';
import { HttpClientModule } from '@angular/common/http';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { SellerLoginComponent } from './authentication/seller-login/seller-login.component';
import { SellerRegistrationComponent } from './authentication/seller-registration/seller-registration.component';
import { HeaderComponent } from './header/header.component';
import { ResetPasswordComponent } from './authentication/reset-password/reset-password.component';
import { SellerDashboardComponent } from './seller-dashboard/seller-dashboard.component';
import { BrowseComponent } from './model/browse/browse.component';
import { ManageModelComponent } from './model/manage-model/manage-model.component';
import { AddAssetComponent } from './model/add-asset/add-asset.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatSelectModule} from '@angular/material/select';
import { RenderComponent } from './model/render/render.component';
import { ModelDetailsComponent } from './model/model-details/model-details.component';
import { NbThemeModule, NbLayoutModule, NbIconModule, NbActionsModule, NbUserModule, NbSidebarModule, NbMenuModule, NbSidebarService, NbSearchModule, NbButtonModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { EllipsisLoaderModule } from '@bit/joshk.ng-spinners.ellipsis-loader';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    UserDashboardComponent,
    SellerLoginComponent,
    SellerRegistrationComponent,
    HeaderComponent,
    ResetPasswordComponent,
    SellerDashboardComponent,
    BrowseComponent,
    ManageModelComponent,
    AddAssetComponent,
    RenderComponent,
    ModelDetailsComponent,
    MainComponent,
    HomeComponent,
    ProfileComponent, 
  ],
  imports: [
    BrowserModule,
    MatIconModule,
    MatButtonModule,
    HttpClientModule,
    AppRoutingModule,
    MatInputModule,
    BrowserAnimationsModule,
    NgbModule,
    MatFormFieldModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatSelectModule,
    NbThemeModule.forRoot({ name: 'default' }),NbIconModule, NbActionsModule, NbUserModule,  NbSidebarModule.forRoot(),NbMenuModule.forRoot(),NbSearchModule, NbButtonModule,
    NbLayoutModule,NbEvaIconsModule,
    EllipsisLoaderModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

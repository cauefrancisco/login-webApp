import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AppComponent } from 'src/app/app.component';
import { LoginComponent } from 'src/app/auth/login/login.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { FooterComponent } from 'src/app/components/main-layout/footer/footer.component';
import { HeaderComponent } from 'src/app/components/main-layout/header/header.component';
import { MainLayoutComponent } from 'src/app/components/main-layout/main-layout.component';
import { MaterialModule } from 'src/app/core/modules/material.module';
import { AuthService } from 'src/app/core/services/auth.service';
import { ListingService } from './core/services/listing.service';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    MainLayoutComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    HttpClientJsonpModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    NgbModule,
    CommonModule,
  ],
  providers: [
    AuthService,
    ListingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

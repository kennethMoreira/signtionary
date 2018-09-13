import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { CountryComponent } from './country/country.component';

import {FormsModule} from '@angular/forms';
import { PeopleComponent } from './people/people.component';
import { AssetComponent } from './asset/asset.component';
import { PermissionComponent } from './permission/permission.component';
import { PersonComponent } from './person/person.component';
import { RequestComponent } from './request/request.component';
import { RoleComponent } from './role/role.component';
import { SignsetComponent } from './signset/signset.component';

@NgModule({
  declarations: [
    AppComponent,
    AssetComponent,
    HomeComponent,
    CountryComponent,
    PeopleComponent,
    PermissionComponent,
    PersonComponent,
    RequestComponent,
    RoleComponent,
    SignsetComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

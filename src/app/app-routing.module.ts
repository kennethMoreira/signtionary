import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CountryComponent } from './country/country.component';
import { PeopleComponent } from './people/people.component';
import { AssetComponent } from './asset/asset.component';
import { PermissionComponent } from './permission/permission.component';
import { PersonComponent } from './person/person.component';
import { RequestComponent } from './request/request.component';
import { RoleComponent } from './role/role.component';
import { SignsetComponent } from './signset/signset.component';

const routes: Routes = [
{path:"", component: HomeComponent},
{path:"asset", component: AssetComponent},
{path:"country", component: CountryComponent},
{path:"permission", component: PermissionComponent} ,
{ path: "person" , component: PersonComponent, },
{ path: "request", component: RequestComponent,},
{ path: "role", component:RoleComponent},
{ path:"signset", component: SignsetComponent},


{path:"people", component: PeopleComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
 
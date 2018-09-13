import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {People} from '../classes/people';
@Injectable({
  providedIn: 'root'
})
export class PeopleService {

  readonly API_URL = "http://modoayuda.com/api/people";

  constructor(private http:HttpClient) {

    
   }

}

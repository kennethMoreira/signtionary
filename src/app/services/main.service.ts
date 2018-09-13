import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
//import {Country} from '../country';


@Injectable({
  providedIn: 'root'
})
export class MainService {

  readonly API_URL = "http://modoayuda.com/api/";
  

  constructor(private http:HttpClient) { }


  getCountries2() {
  return  this.http.get(this.API_URL);  
  }
  getById(id:string, tabla:string) {
    return  this.http.get(this.API_URL+tabla+"/"+id);  
    }
  //?_p=2&_size=50
  get(p:number, size:number, tabla:string) {
    return  this.http.get(this.API_URL+tabla+"?_p="+p+"&_size="+size);  
    }


add(objeto:any, tabla:string){
return this.http.post(this.API_URL+tabla, objeto);
}

patch(objeto:any, tabla:string){
  return this.http.patch(this.API_URL+tabla+"/"+objeto.id, objeto);
}

delete(objeto:any, tabla:string){
  return this.http.delete(this.API_URL+tabla+"/"+objeto.id);
}

count(tabla:string){
  return this.http.get(this.API_URL+tabla+"/count");
}



like(busqueda:string, tabla:string, atributo:string){
  return this.http.get(this.API_URL+tabla+"?_where=("+atributo+",like,~"+busqueda+")");
}

listarTablas(){
  return this.http.get(this.API_URL+"tables");
}

}
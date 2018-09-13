import { Component, OnInit } from '@angular/core';
import { MainService} from '../services/main.service';
import {Person} from '../classes/person';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {
  
  tablaActual:string;

//para listar y agregar

objectArray:any;
id:number;
username:string;
password:string;
first_name:string;
last_name:string;
birthyear:string;
email:string;
gender:string;
phone_num:string;
country_id:number;
role_id:number;

//para buscar
objectBusqueda:any;
attributoBusqueda:string;
buscar:string;

// para editar
Editobject:Person;  
Edited_username:string;
Edited_password:string;
Edited_first_name:string;
Edited_last_name:string;
Edited_birthyear:string;
Edited_email:string;
Edited_gender:string;
Edited_phone_num:string;
Edited_country_id:number;
Edited_role_id:number;

// para paginar
paginacion:number;
itemsPorPagina:number;
paginaAnterior:number;
paginaActual:number;
paginaSiguiente:number;  
cuantasFilas: number;




  constructor(private servicio: MainService) { }

ngOnInit() {
  this.tablaActual="person";
  this.itemsPorPagina=10;
this.calcularPaginacion();   
this.listar();
this.paginaAnterior=0;
this.paginaActual=1;
this.paginaSiguiente=2;
this.attributoBusqueda="username";



}


listar(){
this.servicio.get(this.paginaActual,this.itemsPorPagina, this.tablaActual).subscribe(
  (data)=>{console.log(data);
    this.objectArray=data;
   

    
})


}

busqueda(){
this.servicio.like(this.buscar,this.tablaActual,this.attributoBusqueda).subscribe(
  (data)=>{
    this.objectBusqueda = data;
    this.buscar="";

  }
)

}

agregar(){

let elemento = new Person();

elemento.id = this.id;
elemento.username = this.username;
elemento.password = this.password;
elemento.first_name = this.first_name;
elemento.last_name = this.last_name;
elemento.birthyear = this.birthyear;
elemento.email = this.email;
elemento.gender = this.gender;
elemento.phone_num = this.phone_num;
elemento.country_id = this.country_id;
elemento.role_id = this.role_id;
console.log(elemento);

this.servicio.add(elemento,this.tablaActual).subscribe((data)=>{
  console.log(data);
  this.listar();

 
})

this.id=0;
this.username="";
this.password="";
this.first_name="";
this.last_name="";
this.birthyear="";
this.email="";
this.gender="";
this.phone_num="";
this.country_id=0;
this.role_id=0;





}
editar(objeto:Person){
console.log(objeto);

this.Editobject=objeto;




this.Edited_username=objeto.username;
this.Edited_password=objeto.password;
this.Edited_first_name= objeto.first_name;
this.Edited_last_name= objeto.last_name;
this.Edited_birthyear= objeto.birthyear;
this.Edited_email= objeto.email;
this.Edited_email= objeto.gender;
this.Edited_phone_num= objeto.phone_num;
this.Edited_country_id= objeto.country_id;
this.Edited_role_id= objeto.role_id;
  





this.servicio.count(this.tablaActual).subscribe(
  (count)=>{console.log(count);
  
  })

}
patch(){
console.log(this.Editobject);

this.Editobject.username = this.Edited_username;
this.Editobject.password = this.Edited_password;
this.Editobject.first_name = this.Edited_first_name;
this.Editobject.last_name =this.Edited_last_name;
this.Editobject.birthyear = this.Edited_birthyear;
this.Editobject.email = this.Edited_email;
this.Editobject.gender = this.Edited_gender;
this.Editobject.phone_num =this.Edited_phone_num;
this.Editobject.country_id = this.Edited_country_id;
this.Editobject.role_id = this.Edited_role_id;



this.servicio.patch(this.Editobject,this.tablaActual).subscribe(
  (data)=>{
    console.log(data);
    this.listar();
  }
)

}
eliminar(objeto:Person){
console.log(objeto);
this.servicio.delete(objeto,this.tablaActual).subscribe(
  (data)=>{
    console.log(data);
  this.listar();
  }

)
}


calcularPaginacion(){
this.servicio.count(this.tablaActual).subscribe(
  (data)=>{console.log(data);
    this.cuantasFilas = data[0].no_of_rows;
    console.log(this.cuantasFilas);
    
  this.paginacion=Math.ceil(this.cuantasFilas/this.itemsPorPagina);
  console.log(this.paginacion);

})

}

SiguientePagina(){
if(this.paginaSiguiente<=this.paginacion){

  this.paginaAnterior++;
  this.paginaActual++;
  this.paginaSiguiente++;
}
this.listar();
}
AnteriorPagina(){
if(this.paginaAnterior>0){
  this.paginaAnterior--;
  this.paginaActual--;
  this.paginaSiguiente--;
  this.listar();
}

}
}

import { Component, OnInit } from '@angular/core';
import { PeopleService} from '../services/people.service';
import {People} from '../classes/people';
import  {MainService} from '../services/main.service';




@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  peopleArray:any;
  peopleName:string;
  last:string;
  peopleIdentification:string;
  peopleAddress:string;
  peoplePhoneNumber:string;
  peopleBusqueda:any;
  

  Editpeople:People;
  EditpeopleName:string;
  Editlast:string;
  EditpeopleIdentification:string;
  EditpeopleAddress:string;
  EditpeoplePhoneNumber:string;


  paginacion:number;
  itemsPorPagina:number;
  paginaAnterior:number;
  paginaActual:number;
  paginaSiguiente:number;
  
  cuantasFilas: number;
  buscar:string;
  attributoBusqueda="name";
  tablaActual:string;

  constructor(private servicio: MainService) { }

  ngOnInit() {
    this.tablaActual="people";
    this.itemsPorPagina=10;
this.calcularPaginacion();   
this.listar();
this.paginaAnterior=0;
this.paginaActual=1;
this.paginaSiguiente=2;



  }


listar(){
  this.servicio.get(this.paginaActual,this.itemsPorPagina, this.tablaActual).subscribe(
    (data)=>{console.log(data);
      this.peopleArray = data;
  })
}

busqueda(){
  this.servicio.like(this.buscar,this.tablaActual ,this.attributoBusqueda).subscribe(
    (data)=>{
      this.peopleBusqueda = data;
      this.buscar="";

    }
  )

}

agregar(){
  console.log(this.peopleName)
  let people = new People();
  people.name                  = this.peopleName;
  people.last_name             = this.last;
  people.identification_number = this.peopleIdentification;
  people.adress                = this.peopleAddress;
  people.contact_number        = this.peoplePhoneNumber;

  this.servicio.add(people,this.tablaActual).subscribe((data)=>{
    console.log(data);
    this.listar();

   
  })

  this.peopleName           = "";
  this.last                 = "";
  this.peopleIdentification = "";
  this.peopleAddress        = "";
  this.peoplePhoneNumber    = "";
}
editar(people:People){
  console.log(people);
  this.Editpeople=people;
  this.EditpeopleName=people.name;
  this.Editlast=people.last_name;
  this.EditpeopleIdentification=people.identification_number;
  this.EditpeoplePhoneNumber=people.contact_number;
  this.EditpeopleAddress=people.adress;


  this.servicio.count(this.tablaActual).subscribe(
    (count)=>{console.log(count);
    
    })

}
patch(){
  console.log(this.Editpeople);
  this.Editpeople.name=this.EditpeopleName;
  this.Editpeople.last_name=this.Editlast;
  this.Editpeople.identification_number=this.EditpeopleIdentification;
  this.Editpeople.adress=this.EditpeopleAddress;
  this.Editpeople.contact_number=this.EditpeoplePhoneNumber;

  
  this.servicio.patch(this.Editpeople,this.tablaActual).subscribe(
    (data)=>{
      console.log(data);
      this.listar();
    }
  )

}
eliminar(people:People){
  console.log(people);
  this.servicio.delete(people,this.tablaActual).subscribe(
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

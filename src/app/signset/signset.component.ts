import { Component, OnInit } from '@angular/core';
import {MainService} from '../services/main.service';
import {signset} from '../classes/signset';

@Component({
  selector: 'app-signset',
  templateUrl: './signset.component.html',
  styleUrls: ['./signset.component.css']
})
export class SignsetComponent implements OnInit {

  tablaActual:string;

//para listar y agregar
  objectArray:any;
  id:number;
  name:string;
  description:string;
  
  //para buscar
  objectBusqueda:any;
  attributoBusqueda="name";
  
// para editar
  Editobject:signset;  
  Editname:string;
  Editdescription:string;

// para paginar
  paginacion:number;
  itemsPorPagina:number;
  paginaAnterior:number;
  paginaActual:number;
  paginaSiguiente:number;  
  cuantasFilas: number;
  buscar:string;



    constructor(private servicio: MainService) { }

  ngOnInit() {
    this.tablaActual="sign_set";
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
      this.objectArray = data;
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
  console.log(this.name)
  let elemeto = new signset();
  
  elemeto.name= this.name;
  elemeto.description = this.description;


  this.servicio.add(elemeto,this.tablaActual).subscribe((data)=>{
    console.log(data);
    this.listar();

   
  })

  
  this.name                = "";

}
editar(objeto:signset){
  console.log(objeto);

  this.Editobject=objeto;
  this.Editname=objeto.name;
  this.Editdescription = objeto.description;
 


  this.servicio.count(this.tablaActual).subscribe(
    (count)=>{console.log(count);
    
    })

}
patch(){
  console.log(this.Editobject);
  this.Editobject.name=this.Editname;
  this.Editobject.description = this.description;
  ;

  
  this.servicio.patch(this.Editobject,this.tablaActual).subscribe(
    (data)=>{
      console.log(data);
      this.listar();
    }
  )

}
eliminar(objeto:signset){
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


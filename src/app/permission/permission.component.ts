import { Component, OnInit } from '@angular/core';
import {MainService} from '../services/main.service';
import {Permission} from '../classes/permission';
import {Role} from '../classes/role';
import {Asset} from '../classes/asset';
import { element } from 'protractor';
import { forEach } from '@angular/router/src/utils/collection';


@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.css']
})
export class PermissionComponent implements OnInit {

  
  tablaActual:string;


  //para llaves foraneas
  role:Role;
  asset:Asset;

//para listar y agregar

  objectArray:any;
  id:number;
  role_id:number;
  asset_id:number;
  can_read:string;
  can_insert:string;
  can_update:string;
  can_delete:string;
  
  //para buscar
  objectBusqueda:any;
  attributoBusqueda="asset";
// para editar
  Editobject:Permission;  
  Editedrole_id:number;
  Editedasset_id:number;
  Editedcan_read:string;
  Editedcan_insert:string;
  Editedcan_update:string;
  Editedcan_delete:string;

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
    this.tablaActual="permission";
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
  
  let elemento = new Permission();
  
  elemento.role_id = this.role_id;
  elemento.asset_id = this.asset_id;
  elemento.can_read = this.can_read;
  elemento.can_insert = this.can_insert;
  elemento.can_update = this.can_update;
  elemento.can_delete = this.can_delete;
  console.log(elemento);

  this.servicio.add(elemento,this.tablaActual).subscribe((data)=>{
    console.log(data);
    this.listar();

   
  })

  
  this.role_id=0;
 this.asset_id=0;
 this.can_read= "";
 this.can_insert= "";
 this.can_update= "";
 this.can_delete= "";              

}
editar(objeto:Permission){
  console.log(objeto);

  this.Editobject=objeto;

  this.Editedrole_id=objeto.role_id;
  this.Editedasset_id=objeto.asset_id;
  this.Editedcan_read= objeto.can_read;
  this.Editedcan_insert= objeto.can_insert;
  this.Editedcan_update= objeto.can_update;
  this.Editedcan_delete= objeto.can_delete;   

  
 


  this.servicio.count(this.tablaActual).subscribe(
    (count)=>{console.log(count);
    
    })

}
patch(){
  console.log(this.Editobject);
  this.Editobject.role_id=this.Editedrole_id;
  
this.Editobject.asset_id=  this.Editedasset_id;
 this.Editobject.can_read= this.Editedcan_read;
 this.Editobject.can_read = this.Editedcan_insert;
 this.Editobject.can_update=this.Editedcan_update;
 this.Editobject.can_delete=this.Editedcan_delete;
  ;

  
  this.servicio.patch(this.Editobject,this.tablaActual).subscribe(
    (data)=>{
      console.log(data);
      this.listar();
    }
  )

}
eliminar(objeto:Permission){
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

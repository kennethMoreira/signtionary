import { Component, OnInit } from '@angular/core';
import {CountryService} from '../services/country.service';
import { Country } from "..//classes/country";
import  {MainService} from '../services/main.service';



@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {
  countries:any;
  nombrePais:string ;
  countryaEditar:Country;
  countriesBusqueda:any;
  nombrePaisEditado:string;
  paginacion:number;
  itemsPorPagina:number;
  paginaAnterior:number;
  paginaActual:number;
  paginaSiguiente:number;
  
  cuantasFilas: number;
  buscarpais:string;
  tablaActual:string;
  

  attributoBusqueda="name";

constructor(private servicioPais:MainService){

}


ngOnInit() {
  this.tablaActual="country";
this.itemsPorPagina=10;
this.calcularPaginacion();   
this.listarPais();
this.paginaAnterior=0;
this.paginaActual=1;
this.paginaSiguiente=2;





}

listarPais(){
  this.servicioPais.get(this.paginaActual,this.itemsPorPagina, this.tablaActual).subscribe(
    (data)=>{console.log(data);
      this.countries = data;
  })
}
busqueda(){
  this.servicioPais.like(this.buscarpais, this.tablaActual,this.attributoBusqueda).subscribe(
    (data)=>{
      this.countriesBusqueda = data;
      this.buscarpais="";

    }
  )

}
agregar(){
  console.log(this.nombrePais);

  let country = new Country();
  country.name = this.nombrePais;

  this.servicioPais.add(country,this.tablaActual).subscribe(
    (data)=>{
      console.log(data);
      this.listarPais();
    }
  )
  this.nombrePais ="";
}
editar(country:Country){
  console.log(country);
  this.countryaEditar=country;
  this.countryaEditar.id= country.id
  this.nombrePaisEditado=country.name;

  this.servicioPais.count(this.tablaActual).subscribe(
    (count)=>{console.log(count);
    
    })

}
patch(){
  console.log(this.nombrePaisEditado);
  this.countryaEditar.name = this.nombrePaisEditado;
  this.servicioPais.patch(this.countryaEditar, this.tablaActual).subscribe(
    (data)=>{
      console.log(data);
      this.listarPais();
    }
  )

}
eliminar(country:Country){
  console.log(country);
  this.servicioPais.delete(country, this.tablaActual).subscribe(
    (data)=>{
      console.log(data);
    this.listarPais();
    }

  )
}


calcularPaginacion(){
  this.servicioPais.count(this.tablaActual).subscribe(
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
this.listarPais();
}
AnteriorPagina(){
  if(this.paginaAnterior>0){
    this.paginaAnterior--;
    this.paginaActual--;
    this.paginaSiguiente--;
    this.listarPais();
  }
  
  }
  

  
}

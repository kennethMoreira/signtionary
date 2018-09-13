import { Component, OnInit } from '@angular/core';
import { MainService} from '../services/main.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private servicio: MainService) { }
  paginacion:number;
  itemsPorPagina:number;
  paginaAnterior:number;
  paginaActual:number;
  paginaSiguiente:number;
  
  cuantasFilas: number;
  tablaActual:string;
  

  tablas:any; 
  objeto:any;
  
  


  ngOnInit() {
    this.itemsPorPagina=10;


this.resetPaginacion();
    this.cargarTablas();
  }

  resetPaginacion(){
    this.paginaAnterior=0;
    this.paginaActual=1;
    this.paginaSiguiente=2;
  }
  cargarTablas(){
    this.servicio.listarTablas().subscribe(
      (data)=>{
        console.log(data); 
        this.tablas=data;
        
      }
    )
    
  }
  getTabla(tabla:string){
    this.calcularPaginacion(tabla);
    this.tablaActual=tabla;
    
    this.servicio.get(this.paginaActual,this.itemsPorPagina, tabla).subscribe(
      (data)=>{
        this.objeto = data;
        console.log("objeto");
        console.log(this.objeto);
        
        

        
      }
    )

  }
  calcularPaginacion(tabla:string){
    this.servicio.count(tabla).subscribe(
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
  this.getTabla(this.tablaActual);
  }
  AnteriorPagina(){
    if(this.paginaAnterior>0){
      this.paginaAnterior--;
      this.paginaActual--;
      this.paginaSiguiente--;
      this.getTabla(this.tablaActual);
    }
  }
  eliminar(objeto:any){
    console.log(objeto);
    this.servicio.delete(objeto,this.tablaActual).subscribe(
      (data)=>{
        console.log(data);
        this.getTabla(this.tablaActual);
     
      }
  
    )
  }
    


}

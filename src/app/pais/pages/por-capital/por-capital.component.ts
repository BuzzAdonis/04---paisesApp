import { Component } from '@angular/core';
import { Country } from '../../interfaces/pais.interface';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-por-capital',
  templateUrl: './por-capital.component.html',
  styleUrls: ['./por-capital.component.css']
})
export class PorCapitalComponent {
  termino : string ='';
  hayError: Boolean = false;
  paises  : Country[] = [];
  paisesSugeridos  : Country[] = [];
  mostrarSugerencias:boolean = false;
  constructor(private paisService:PaisService){}
  buscar(termino:string){ 
    this.termino = termino
   this.paisService.buscarCapital(this.termino)
            .subscribe((paises)=>{
            this.paises = paises;
            this.hayError = false;
            },(err)=>{
              this.paises =[];
              this.hayError = true;
            });
  }

  sugerencias( termino:string ){
    this.hayError = false;
    this.termino = termino;
    this.mostrarSugerencias = true;
    this.paisService.buscarCapital( termino )
      .subscribe(paises=> this.paisesSugeridos = paises.splice(0,5) ,
      (err) => this.paisesSugeridos=[] );
  }

  buscarSugerido(termino: string){
    this.sugerencias(termino);
  }
}

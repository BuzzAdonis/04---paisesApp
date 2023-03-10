import { Component } from '@angular/core';
import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-por-region',
  templateUrl: './por-region.component.html',
  styleUrls: ['./por-region.component.css']
})
export class PorRegionComponent {

  regiones    : string[] = ['africa', 'americas', 'asia', 'europe', 'oceania'];
  regionActiva: string = '';
  hayError: Boolean = false;
  paises  : Country[] = [];
  constructor(private paisService:PaisService){}

  getClaseCSS(region: string): string {
      return (region === this.regionActiva) 
              ? 'btn btn-outline-primary activate'
              : 'btn btn-outline-primary';
  }

  activarRegion( region: string ){
    if(region === this.regionActiva){return;}
    this.regionActiva = region;
    this.paises = [];
    this.paisService.buscarRegion(region).subscribe((paises)=>{
      this.paises = paises;
      this.hayError = false;
      },(err)=>{
        this.paises =[];
        this.hayError = true;
      });
  }
}

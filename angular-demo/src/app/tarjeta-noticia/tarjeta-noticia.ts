import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-tarjeta-noticia',
  styleUrl: './tarjeta-noticia.css',
  templateUrl: './tarjeta-noticia.html',
})
export class TarjetaNoticia {
  titulo = 'El agua que no llega: seis meses de racionamiento en la sabana';
  autor = 'Valeria Restrepo';
  categoria = 'Economía';
  resumen = 'Los embalses cayeron al 31% de su capacidad y once municipios entraron en turnos de suministro.';
}

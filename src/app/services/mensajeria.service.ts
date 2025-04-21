import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MensajeriaService {

  constructor() { }

  mostrarMensaje(titulo: string, mensaje: string, tipo: any) {
    alert(mensaje);
  }
  
}

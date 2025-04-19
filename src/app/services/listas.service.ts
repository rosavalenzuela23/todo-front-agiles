import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListasService {

  listas: string[];

  constructor() {
    const stringListas = localStorage.getItem('listas');

    if (stringListas === null) {
      this.listas = []; //Aunque deberiamos de ir a la base de datos por las listas...
    } else {
      this.listas = JSON.parse(stringListas);
    }

  }

  async crearNuevaLista(nombreLista: string) {
    const lista = this.listas.find(lista => lista === nombreLista);
    if (lista) throw new Error("La lista ya existe 😒😒😒😒");
    this.listas.push(nombreLista);
    //Tenemos que crear un respaldo?
    await this.crearRespaldo();
  }

  async crearRespaldo() {
    await Promise.resolve();
    localStorage.setItem("listas", JSON.stringify(this.listas));
  }

  async obtenerListas(): Promise<string[]> {
    await Promise.resolve();
    return this.listas;
  }

}

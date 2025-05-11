import { Injectable } from '@angular/core';
import { TareasService } from './tareas.service';

@Injectable({
  providedIn: 'root'
})
export class ListasService {

  listas: string[];

  constructor(
    private tareaService: TareasService
  ) {
    const stringListas = localStorage.getItem('listas');

    if (stringListas === null) {
      this.listas = ["sin categoria"]; //Aunque deberiamos de ir a la base de datos por las listas...
      this.crearRespaldo();
    } else {
      this.listas = JSON.parse(stringListas);

      if(!this.listas.includes("sin categoria")){
        this.listas.unshift("sin categoria");
        this.crearRespaldo();
      }
      
    }

  }

  async crearNuevaLista(nombreLista: string) {
    const lista = this.listas.find(lista => lista === nombreLista);
    if (lista) throw new Error("La lista ya existe 😒😒😒😒");
    this.listas.push(nombreLista);
    //Tenemos que crear un respaldo?
    await this.crearRespaldo();
  }

  async actualizarNombreTarea(nombreNuevo: string, nombreAntiguo: string) {
    //actualizar tareas
    await this.tareaService
    .actualizarListaDeTareasConLista(nombreAntiguo, nombreNuevo);
    //actualizar nombre
    const index = this.listas.lastIndexOf(nombreAntiguo);
    this.listas[index] = nombreNuevo;
    await this.crearRespaldo();
  }

  async eliminarNombreLista(nombreLista: string) {
    const tareas = await this.tareaService.obtenerTareaConLista(nombreLista);
    tareas.forEach( t=> t.nombreLista = "");

    this.listas = this.listas.filter(lista => lista != nombreLista);
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

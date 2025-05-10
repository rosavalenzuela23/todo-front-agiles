import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { Modal } from 'bootstrap';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ListasService } from '../../services/listas.service';
import Task, { TaskEstado } from '../../entities/Task';
import { TareasService } from '../../services/tareas.service';
import { TaskComponentComponent } from '../../components/task-component/task-component.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listas',
  imports: [HeaderComponent, SidebarComponent, ReactiveFormsModule, TaskComponentComponent],
  templateUrl: './listas.component.html',
  styleUrl: './listas.component.css'
})
export class ListasComponent {

  nombreLista: FormControl = new FormControl("", Validators.required);
  nombresListas: string[] = [];

  listaActual: string = "";

  listaTareas: Task[] = [];
  listaTareasTerminadas: Task[] = [];

  constructor(
    private listaService: ListasService,
    private tareaService: TareasService,
    private router: Router
  ) { }

  async ngOnInit() {
    await this.actualizarVista();
  }

  async guardarNombreLista(event: Event) {

    event.preventDefault();

    if (this.nombreLista.errors != null) {
      alert("Por favor, ingrese el nombre de la categoría");
      return;
    }

    await this.listaService.crearNuevaLista(this.nombreLista.value)
      .catch(e => {
        alert(e);
        throw new Error('');
      });

    this.nombreLista.setValue(''); // resetear el valor
    alert("La lista se agrego con exito!");
    await this.actualizarVista();
  }

  async actualizarVista() {
    const listas = await this.listaService.obtenerListas();
    this.nombresListas = listas;
    this.actualizarListasDeTareas(this.listaActual);
  }

  async cambiarEstado(tarea: Task) {
    this.tareaService.cambiarEstadoTarea(tarea.idPropio!);
    this.actualizarVista();
  }

  async editarLista(evento: Event) {
    evento.preventDefault();

    if (!this.nombreLista.valid) {
      alert("Porfavor rellene el campo necesario");
      return;
    }

    await this.listaService.actualizarNombreTarea(this.nombreLista.value, this.listaActual);
    this.listaActual = this.nombreLista.value;
    this.nombreLista.setValue('');
    await this.actualizarVista();
  }

  async cambiarListaActual(event: Event) {
    const elemento = event.target as HTMLSelectElement;
    const valor = elemento.value;
    this.listaActual = valor;
    await this.actualizarListasDeTareas(valor);
  }

  async actualizarListasDeTareas(nombreLista: string) {
    const tareas = await this.tareaService.obtenerTareaConLista(nombreLista);

    this.listaTareasTerminadas = tareas.filter(t => t.estado === TaskEstado.TERMINADA);
    this.listaTareas = tareas.filter(t => t.estado === TaskEstado.ABIERTA)
  }

  editarTarea(tarea: Task) {
    this.tareaService.guardarTareaAEditar(tarea);
    this.router.navigate(['agregar'])
  }

}

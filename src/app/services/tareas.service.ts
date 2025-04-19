import { Injectable } from '@angular/core';
import Task, { TaskEstado } from '../entities/Task';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private tareas: Task[];

  constructor() {
    this.tareas = [];
    const lista = localStorage.getItem('lista-tareas');
    if (lista) {
      this.tareas = JSON.parse(lista);
    }
  }

  async guardarTarea(task: Task) {
    const ids: number[] = [];
    this.tareas.forEach(t => ids.push(t.id!));
    let ultimoId = Math.max(...ids);

    //En caso de que sea la primera que se agrega
    if (ultimoId == Infinity || ultimoId == -Infinity) {
      ultimoId = 1;
    }

    task.id = ultimoId + 1;

    this.tareas.push(task);
    await this.crearRespaldo();
  }

  async actualizarTarea(task: Task) {
    const tarea = this.tareas.find(
      t => t.id === task.id
    );

    if (!tarea) {
      throw new Error("La tarea que quiere actualizar no existe!");
    }

    Object.assign(tarea, task);
    await this.crearRespaldo();
  }

  async cambiarEstadoTarea(idTarea: number) {
    const refTarea = this.tareas.find(t => t.id === idTarea);
    if (!refTarea) {
      throw new Error('La tarea no existe');
    }

    if (refTarea.estado === TaskEstado.ABIERTA) {
      refTarea.estado = TaskEstado.TERMINADA;
    } else {
      refTarea.estado = TaskEstado.ABIERTA;
    }

    await this.crearRespaldo();
  }

  guardarTareaAEditar(task: Task) {
    localStorage.setItem('tarea-editar', JSON.stringify(task));
  }

  eliminarTarea(taskId: number) {
    this.tareas = this.tareas.filter(t => t.id != taskId);
  }

  async obtenerTareaEditar(): Promise<Task | null> {
    const jsonString = localStorage.getItem('tarea-editar');
    if (!jsonString) {
      return null;
    }
    localStorage.removeItem('tarea-editar');
    return JSON.parse(jsonString) as Task;
  }

  async obtenerTodasLasTareas(): Promise<Task[]> {
    return this.tareas;
  }

  async crearRespaldo() {
    localStorage.setItem('lista-tareas', JSON.stringify(this.tareas));
  }

}

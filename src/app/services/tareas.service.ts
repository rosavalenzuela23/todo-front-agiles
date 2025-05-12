import { Injectable } from '@angular/core';
import Task, { TaskEstado } from '../entities/Task';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import Usuario from '../entities/Usuario';
import { ServicioUsuario } from './ServicioUsuario';

@Injectable({
  providedIn: 'root'
})
export class TareasService {
  private tareas: Task[];

  private enpointTareas = "http://localhost:3000/users/me/tasks";
  private bulkEnpoint = "http://localhost:3000/tasks/bulk";

  constructor(
    private httpClient: HttpClient,
    private servicioUsuario: ServicioUsuario
  ) {
    this.tareas = [];
    const lista = sessionStorage.getItem('lista-tareas');
    if (lista) {
      this.tareas = JSON.parse(lista);
    }
  }

  async guardarTarea(task: Task) {
    const ids: number[] = [];
    this.tareas.forEach(t => ids.push(t.idPropio!));
    let ultimoId = Math.max(...ids);

    //En caso de que sea la primera que se agrega
    if (ultimoId == Infinity || ultimoId == -Infinity) {
      ultimoId = 1;
    }

    task.idPropio = ultimoId + 1;

    this.tareas.push(task);
    await this.crearRespaldo();
  }

  async obtenerTareaConLista(nombreLista: string) {
    return this.tareas.filter(t => t.nombreLista === nombreLista);
  }

  async actualizarTarea(task: Task) {
    const tarea = this.tareas.find(
      t => t.idPropio === task.idPropio
    );

    if (!tarea) {
      throw new Error("La tarea que quiere actualizar no existe!");
    }

    Object.assign(tarea, task);
    await this.crearRespaldo();
  }

  async cambiarEstadoTarea(idTarea: number) {
    const refTarea = this.tareas.find(t => t.idPropio === idTarea);
    if (!refTarea) {
      throw new Error('La tarea no existe');
    }

    if (refTarea.estado === TaskEstado.ABIERTA) {
      refTarea.estado = TaskEstado.TERMINADA;
    } else {
      refTarea.estado = TaskEstado.ABIERTA;
    }

    this.crearRespaldo();
  }

  guardarTareaAEditar(task: Task) {
    sessionStorage.setItem('tarea-editar', JSON.stringify(task));
  }

  eliminarTarea(taskId: number) {
    this.tareas = this.tareas.filter(t => t.idPropio != taskId);
    this.crearRespaldo();
  }

  async obtenerTareaEditar(): Promise<Task | null> {
    const jsonString = sessionStorage.getItem('tarea-editar');
    if (!jsonString) {
      return null;
    }
    sessionStorage.removeItem('tarea-editar');
    return JSON.parse(jsonString) as Task;
  }

  async actualizarListaDeTareasConLista(nombreAntiguo: string, nombreNuevo: string) {

    this.tareas.forEach(tarea => {
      if (tarea.nombreLista === nombreAntiguo) {
        tarea.nombreLista = nombreNuevo;
      }
    })

    await this.crearRespaldo();
  }

  async obtenerTodasLasTareas(): Promise<any[]> {

    const currentUser = this.servicioUsuario.getCurrentUser();
    if (currentUser === null) {
      return [];
    }

    const resquestOptions: any = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.servicioUsuario.getAccessToken()}`
      },
      user: currentUser
    }

    const res = await fetch(this.enpointTareas, resquestOptions);
    if (res.status < 200 && res.status > 299) {
      throw new Error("Error al obtener las tareas");
    }
    const { tasks } = await res.json() || [];
    
    this.tareas = Task.fromServerArray(tasks);
    await this.crearRespaldoLocalStorage();
    
    return this.tareas;
  }

  async crearRespaldoLocalStorage() {
    sessionStorage.setItem('lista-tareas', JSON.stringify(this.tareas));
  }

  async crearRespaldo() {
    sessionStorage.setItem('lista-tareas', JSON.stringify(this.tareas));
    let user = this.servicioUsuario.getCurrentUser();
    if (user === null) {
      throw new Error("No hay usuario logueado");
    }

    fetch(this.bulkEnpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'UserEmail': user.email!,
        'Authorization': `Bearer ${this.servicioUsuario.getAccessToken()}`
      },
      body: JSON.stringify(Task.toServerObjectArray(this.tareas))
    }).then(res => {

      if (res.status < 200 && res.status > 299) {
        throw new Error("Error al crear el respaldo");
      }

      console.log("Respaldo creado");
    })

  }

}

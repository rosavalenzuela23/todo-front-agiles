import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { BotonAgregarTareaComponent } from "../../components/boton-agregar-tarea/boton-agregar-tarea.component";
import Task, { TaskEstado } from '../../entities/Task';
import { TareasService } from '../../services/tareas.service';
import { TaskComponentComponent } from "../../components/task-component/task-component.component";
import { Router } from '@angular/router';
import { ServicioUsuario } from '../../services/ServicioUsuario';

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent, SidebarComponent, BotonAgregarTareaComponent, TaskComponentComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  tareasAbiertas: Task[] = [];
  tareasTerminadas: Task[] = [];

  constructor(
    private tareaService: TareasService,
    private usuarioService: ServicioUsuario,
    private router: Router
  ) { }

  async ngOnInit() {

    const usuario = this.usuarioService.getCurrentUser();

    if (usuario == null) {
      this.router.navigate(['']);
      return;
    }

    await this.actualizarVista();
  }

  async actualizarVista() {
    const tareas = await this.tareaService.obtenerTodasLasTareas();
    this.tareasAbiertas = tareas.filter(t => t.estado === TaskEstado.ABIERTA);
    this.tareasTerminadas = tareas.filter(t => t.estado === TaskEstado.TERMINADA);
  }

  editarTarea(tarea: Task) {
    this.tareaService.guardarTareaAEditar(tarea);
    this.router.navigate(['agregar'])
  }

  async terminarTarea(tarea: Task) {
    this.tareaService.cambiarEstadoTarea(tarea.idPropio!);
    //fire a sound effect
    await this.actualizarVista();
  }

  async abrirTarea(tarea: Task) {
    this.tareaService.cambiarEstadoTarea(tarea.idPropio!);
    await this.actualizarVista();    
  }

}

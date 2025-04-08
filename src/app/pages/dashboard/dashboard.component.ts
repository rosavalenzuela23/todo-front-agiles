import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { BotonAgregarTareaComponent } from "../../components/boton-agregar-tarea/boton-agregar-tarea.component";
import Task from '../../entities/Task';
import { TareasService } from '../../services/tareas.service';
import { TaskComponentComponent } from "../../components/task-component/task-component.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent, SidebarComponent, BotonAgregarTareaComponent, TaskComponentComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  tareas: Task[] = [];

  constructor(
    private tareaService: TareasService,
    private router: Router
  ){}

  async ngOnInit() {
    const tareas = await this.tareaService.obtenerTodasLasTareas();
    this.tareas = tareas;
  }

  editarTarea(tarea: Task) {
    this.tareaService.guardarTareaAEditar(tarea);
    this.router.navigate(['agregar'])
  }

}

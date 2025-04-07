import { Component } from '@angular/core';
import { TaskComponentComponent } from "../../components/task-component/task-component.component";
import Task, { TaskEstado } from '../../entities/Task';
import { TareasService } from '../../services/tareas.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-mistareas',
  imports: [TaskComponentComponent, RouterModule],
  templateUrl: './mistareas.component.html',
  styleUrl: './mistareas.component.css'
})
export class MistareasComponent {

  tareasAMostrar: Task[] = [];

  constructor(
    private router: Router,
    private tareaService: TareasService
  ){}

  async ngOnInit() {
    await this.obtenerTodasLasTareas();
  }

  editarTarea(tarea: Task) {
    this.tareaService.guardarTareaAEditar(tarea);
    this.router.navigate(['/agregar']);
  }

  async obtenerTodasLasTareas() {
    const tareas = await this.tareaService.obtenerTodasLasTareas();
    this.tareasAMostrar = tareas;
  }


}

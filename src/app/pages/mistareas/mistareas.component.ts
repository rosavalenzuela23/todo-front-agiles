import { Component } from '@angular/core';
import { TaskComponentComponent } from "../../components/task-component/task-component.component";
import Task, { TaskEstado } from '../../entities/Task';

@Component({
  selector: 'app-mistareas',
  imports: [TaskComponentComponent],
  templateUrl: './mistareas.component.html',
  styleUrl: './mistareas.component.css'
})
export class MistareasComponent {

  tareaPrueba = new Task(
    "Tarea 1",
    "No tiene descripcion",
    TaskEstado.ABIERTA,
  );

}

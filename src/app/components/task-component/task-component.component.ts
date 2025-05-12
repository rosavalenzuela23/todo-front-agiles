import { Component, EventEmitter, Input, Output } from '@angular/core';
import Task from '../../entities/Task';

@Component({
  selector: 'app-task-component',
  imports: [],
  templateUrl: './task-component.component.html',
  styleUrl: './task-component.component.css'
})
export class TaskComponentComponent {

  isDivVisble = false;

  @Input({ required: true })
  task: Task = null!;

  @Input()
  terminada: boolean = false;

  @Output() 
  editarTareaEvento = new EventEmitter<Task>();

  @Output()
  cambiarEstadoEvento = new EventEmitter<Task>();

  @Output()
  eliminarTareaEvento = new EventEmitter<Task>();

  editarTarea() {
    this.editarTareaEvento.emit(this.task);
  }

  cambiarEstado() {
    this.cambiarEstadoEvento.emit(this.task);
  }

  eliminarTarea() {
    this.eliminarTareaEvento.emit(this.task);
  }

  changeIcon(showDiv: boolean) {
    this.isDivVisble = showDiv;
  }

}

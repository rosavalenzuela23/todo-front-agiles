import { Component, Input } from '@angular/core';
import Task from '../../entities/Task';

@Component({
  selector: 'app-task-component',
  imports: [],
  templateUrl: './task-component.component.html',
  styleUrl: './task-component.component.css'
})
export class TaskComponentComponent {

  @Input({ required: true })
  task: Task = new Task();

}

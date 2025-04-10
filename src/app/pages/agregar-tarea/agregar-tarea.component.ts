import { Component, Input } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  RequiredValidator,
  Validators,
} from '@angular/forms';
import Task from '../../entities/Task';
import { TareasService } from '../../services/tareas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-tarea',
  imports: [ReactiveFormsModule],
  templateUrl: './agregar-tarea.component.html',
  styleUrl: './agregar-tarea.component.css',
})
export class AgregarTareaComponent {
  datosTarea = new FormGroup({
    titulo: new FormControl('', Validators.required),
    descripcion: new FormControl(''),
    fechaTermino: new FormControl(),
    nombreLista: new FormControl(''),
  });

  tareaAEditar: Task | null = null;

  nombreBotonGuardar: string = 'Guardar tarea';
  esEdicion: boolean = false;

  constructor(private router: Router, private tareaService: TareasService) {}

  async ngOnInit() {
    const tareaAEditar = await this.tareaService.obtenerTareaEditar();

    if (tareaAEditar != null) {
      this.tareaAEditar = tareaAEditar;
      this.esEdicion = true;
      this.nombreBotonGuardar = 'Confirmar cambios';
      this.setDatosTareaEnFormGroup();
    }
  }

  eliminarTarea() {
    if (!this.tareaAEditar) throw new Error("No se puede eliminar una tarea no existente");
    this.tareaService.eliminarTarea(this.tareaAEditar.id!);
    alert("La tarea se elimino con exito!");
    this.router.navigate(['/dashboard']);
  }

  private setDatosTareaEnFormGroup() {
    this.datosTarea.controls.titulo.setValue(this.tareaAEditar?.titulo || '');
    this.datosTarea.controls.descripcion.setValue(
      this.tareaAEditar?.descripcion || ''
    );
    this.datosTarea.controls.fechaTermino.setValue(
      this.tareaAEditar?.fechaTermino
    );
    this.datosTarea.controls.nombreLista.setValue(
      this.tareaAEditar?.nombreLista || ''
    );
  }

  async editarTarea(evento: Event) {
    Object.assign(this.tareaAEditar!, this.datosTarea.value);
    this.tareaService.actualizarTarea(this.tareaAEditar!);
    alert('La tarea se actualizo con exito!');
  }

  async botonGuardarClick(evento: Event) {
    if (this.esEdicion) {
      this.editarTarea(evento);
    } else {
      this.guardarTarea(evento);
    }

    this.router.navigate(['/dashboard']);
  }

  async guardarTarea(evento: Event) {
    if (!this.datosTarea.valid) {
      alert('Agrege al menos un nombre a la tarea');
      return;
    }
    const task = new Task();
    Object.assign(task, this.datosTarea.value);
    //guardar la tarea
    await this.tareaService.guardarTarea(task);
    alert('La tarea se guardo con exito!');
  }

  regresar() {
    this.router.navigate(['dashboard']);
  }
}

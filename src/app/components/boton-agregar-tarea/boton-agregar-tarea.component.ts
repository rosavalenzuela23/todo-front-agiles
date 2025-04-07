import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-boton-agregar-tarea',
  imports: [],
  templateUrl: './boton-agregar-tarea.component.html',
  styleUrl: './boton-agregar-tarea.component.css'
})
export class BotonAgregarTareaComponent {

  constructor(
    private router: Router
  ){}

  agregarTarea() {
    this.router.navigate(['agregar']);
  }

}

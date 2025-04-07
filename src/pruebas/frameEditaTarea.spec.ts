import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditaTareaComponent } from './editarTarea.component';

describe('MistareasComponent', () => {
  let component: EditaTareaComponent;
  let fixture: ComponentFixture<EditaTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditaTareaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditaTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('No carga el formulario de forma correcta', () => {
    throw new Error ('No se cargo el formulario amiko');
  });

  it('No se completan los campos con la informacion de la tarea seleccionada', () => {
    throw new Error ('No se cargaron los dias de tareas amiko');
  });

  it('No cargan datos del usuario en la interfaz', () => {
    throw new Error ('No se cargo amiko');
  });

  it('No cargan las notificaciones del usuario en la interfaz', () => {
    throw new Error ('No se cargo amiko');
  });

  it('No funciona el boton de confirmar cambios', () => {
    throw new Error ('No acciona nada al clickear');
  });

  it('No funciona el boton de cancelar edicion', () => {
    throw new Error ('No acciona nada al clickear');
  });

});
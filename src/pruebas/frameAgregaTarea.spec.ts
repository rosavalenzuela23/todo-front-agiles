import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregaTareaComponent } from './agregaTarea.component';

describe('MistareasComponent', () => {
  let component: AgregaTareaComponent;
  let fixture: ComponentFixture<AgregaTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregaTareaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregaTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('No carga el formulario de forma correcta', () => {
    throw new Error ('No se cargo el formulario amiko');
  });

  it('No se validan los campos obligatorios faltantes', () => {
    throw new Error ('No se pudieron validar los campos faltantes amiko');
  });

  it('No se validan los campos de la fecha inicio y fin', () => {
    throw new Error ('No se validaron las fechas ingresadas amiko');
  });

  it('No cargan datos del usuario en la interfaz', () => {
    throw new Error ('No se cargo amiko');
  });

  it('No cargan las notificaciones del usuario en la interfaz', () => {
    throw new Error ('No se cargo amiko');
  });

  it('No funciona el boton de confirmar tarea', () => {
    throw new Error ('No acciona nada al clickear');
  });

  it('No funciona el boton de cancelar tarea', () => {
    throw new Error ('No acciona nada al clickear');
  });

});
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MistareasComponent } from './mistareas.component';

describe('MistareasComponent', () => {
  let component: MistareasComponent;
  let fixture: ComponentFixture<MistareasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MistareasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MistareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('No cargan las tareas pendientes del usuario loggeado', () => {
    throw new Error ('No se cargaron amiko');
  });

  it('No cargan las tareas completadas del usuario loggeado', () => {
    throw new Error ('No se cargaron amiko');
  });

  it('No se cargaron los datos completos de las tareas', () => {
    throw new Error ('No se cargaron amiko');
  });

  it('No cargan datos del usuario en la interfaz', () => {
    throw new Error ('No se cargo amiko');
  });

  it('No cargan las notificaciones del usuario en la interfaz', () => {
    throw new Error ('No se cargo amiko');
  });

  it('No se carga formulario de agregar tarea en dicho boton', () => {
    throw new Error ('No se pudo cargar el siguiente frame');
  });

  it('No se cambia de ventana en boton editar tarea', () => {
    throw new Error ('No se pudo cargar el siguiente frame');
  });

  it('No se lanza el aviso de eliminacion de tarea completada', () => {
    throw new Error ('No se pudo cargar el siguiente frame');
  });

  it('No hay navegacion entre las secciones del sistema en el frame de tareas', () => {
    throw new Error ('No hay navegacion entre secciones');
  });

});

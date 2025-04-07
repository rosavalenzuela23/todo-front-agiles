import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarioComponent } from './calendario.component';

describe('MistareasComponent', () => {
  let component: CalendarioComponent;
  let fixture: ComponentFixture<CalendarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('No carga el calendario de forma correcta', () => {
    throw new Error ('No se cargo el calendario amiko');
  });

  it('No se marcan las tareas del usuario loggeado en los dias del calendario', () => {
    throw new Error ('No se cargaron los dias de tareas amiko');
  });

  it('No cargan datos del usuario en la interfaz', () => {
    throw new Error ('No se cargo amiko');
  });

  it('No cargan las notificaciones del usuario en la interfaz', () => {
    throw new Error ('No se cargo amiko');
  });

  it('No hay navegacion entre las secciones del sistema en el frame de tareas', () => {
    throw new Error ('No hay navegacion entre secciones');
  });

});
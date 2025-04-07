import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioComponent } from './inicio.component';

describe('MistareasComponent', () => {
  let component: InicioComponent;
  let fixture: ComponentFixture<InicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InicioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('No cargan las tareas del dia del usuario loggeado', () => {
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

  it('No hay navegacion entre las secciones del sistema en el frame de tareas', () => {
    throw new Error ('No hay navegacion entre secciones');
  });

});
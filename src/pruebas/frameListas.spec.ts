import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListasComponent } from './listas.component';

describe('MistareasComponent', () => {
  let component: ListasComponent;
  let fixture: ComponentFixture<ListasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('No cargan las tareas del usuario loggeado', () => {
    throw new Error ('No se cargaron amiko');
  });

  it('No se cargaron los datos completos de las tareas', () => {
    throw new Error ('No se cargaron amiko');
  });

  it('No se cargan las categorias de las tareas en el combobox', () => {
    throw new Error ('No se cargaron las categorias de tareas');
  });

  it('No se filtran las tareas mediante la categoria seleccionada', () => {
    throw new Error ('No se cargo amiko');
  });

  it('No hay navegacion entre las secciones del sistema en el frame de tareas', () => {
    throw new Error ('No hay navegacion entre secciones');
  });

});
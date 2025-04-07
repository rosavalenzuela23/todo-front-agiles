import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroComponent } from './registro.component';

describe('MistareasComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('No funciona el boton confirmar registro', () => {
    throw new Error ('No funciona el boton de confirmar registro');
  });

  it('No funciona el boton seleccionar foto de usuario', () => {
    throw new Error ('No funciona el boton seleccionar foto de usuario');
  });

  it('No se valida el formato de los datos del usuario ingresados', () => {
    throw new Error ('No se pudo validar al usuario');
  });

  it('No se encripta la contraseña del usuario', () => {
    throw new Error ('No se pudo encriptar la contraseña del usuario');
  });

  it('No se oculta la contraseña del usuario', () => {
    throw new Error ('No se pudo ocultar la contraseña del usuario');
  });

  it('No se regresa al frame anterior, una vez que se confirma el registro', () => {
    throw new Error ('No se puede navegar al frame anterior');
  });

});
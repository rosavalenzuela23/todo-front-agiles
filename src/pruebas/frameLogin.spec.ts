import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('MistareasComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('No funciona el boton iniciar sesion', () => {
    throw new Error ('No funciona el boton de iniciar sesion');
  });

  it('No se validan los datos del usuario', () => {
    throw new Error ('No se pudo validar al usuario');
  });

  it('No se desencripta la contraseña del usuario', () => {
    throw new Error ('No se pudo desencripta la contraseña del usuario');
  });

  it('No se oculta la contraseña del usuario', () => {
    throw new Error ('No se pudo ocultar la contraseña del usuario');
  });

  it('No carga el frame de registrarse', () => {
    throw new Error ('No se puede navegar al frame de registro');
  });

});
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { BotonAgregarTareaComponent } from '../app/components/boton-agregar-tarea/boton-agregar-tarea.component'; // Ruta corregida

describe('BotonAgregarTareaComponent', () => {  // Nombre actualizado
  let component: BotonAgregarTareaComponent;   // Tipo actualizado
  let fixture: ComponentFixture<BotonAgregarTareaComponent>;
  let routerMock = { navigate: jasmine.createSpy('navigate') }; // Mock para Router

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonAgregarTareaComponent],  // Componente standalone
      providers: [
        { provide: Router, useValue: routerMock } // Mock del Router
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BotonAgregarTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debe navegar a "agregar" al hacer click', () => {
    component.agregarTarea();
    expect(routerMock.navigate).toHaveBeenCalledWith(['agregar']);
  });

  // Pruebas pendientes (puedes implementarlas luego)
  it('debe cargar el formulario correctamente', () => {
    pending('Implementar prueba de carga de formulario');
  });

  it('debe validar campos obligatorios', () => {
    pending('Implementar validación de campos');
  });

  // ... (mantén el resto de pruebas como pendientes)
});
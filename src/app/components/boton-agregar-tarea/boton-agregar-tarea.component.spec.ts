import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonAgregarTareaComponent } from './boton-agregar-tarea.component';

describe('BotonAgregarTareaComponent', () => {
  let component: BotonAgregarTareaComponent;
  let fixture: ComponentFixture<BotonAgregarTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonAgregarTareaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonAgregarTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

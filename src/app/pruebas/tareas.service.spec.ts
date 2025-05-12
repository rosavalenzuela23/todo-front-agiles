import { TestBed } from '@angular/core/testing';
import { TareasService } from '../services/tareas.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ServicioUsuario } from '../services/ServicioUsuario';
import Task, { TaskEstado } from '../entities/Task';


describe('TareasService', () => {
  let service: TareasService;
  let mockServicioUsuario: jasmine.SpyObj<ServicioUsuario>;

  // Datos de prueba
  const mockTareas = [
    new Task('Tarea 1', 'Descripción 1', '2023-01-01', TaskEstado.ABIERTA, 'Lista 1', 1),
    new Task('Tarea 2', 'Descripción 2', '2023-01-02', TaskEstado.TERMINADA, 'Lista 1', 2)
  ];

  beforeEach(() => {
    // Mock de ServicioUsuario
    mockServicioUsuario = jasmine.createSpyObj('ServicioUsuario', ['getCurrentUser', 'getAccessToken']);
    mockServicioUsuario.getCurrentUser.and.returnValue({ email: 'test@example.com', id: 1 });
    mockServicioUsuario.getAccessToken.and.returnValue('mock-token');

    // Mock de localStorage
    spyOn(localStorage, 'getItem').and.callFake((key: string) => {
      if (key === 'lista-tareas') return JSON.stringify(mockTareas);
      if (key === 'tarea-editar') return JSON.stringify(mockTareas[0]);
      return null;
    });
    spyOn(localStorage, 'setItem').and.callThrough();
    spyOn(localStorage, 'removeItem').and.callThrough();

    // Mock de fetch
    spyOn(window, 'fetch').and.callFake(() => 
      Promise.resolve(new Response(JSON.stringify({}), { status: 200 }))
    );

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TareasService,
        { provide: ServicioUsuario, useValue: mockServicioUsuario }
      ]
    });

    service = TestBed.inject(TareasService);
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  describe('guardarTarea', () => {
    it('debería agregar nueva tarea con ID autoincremental', async () => {
      const newTask = new Task('Nueva Tarea');
      await service.guardarTarea(newTask);
      
      expect(newTask.idPropio).toBe(3);
      expect(service['tareas'].length).toBe(3);
    });
  });

  describe('actualizarTarea', () => {
    it('debería actualizar tarea existente', async () => {
      const updatedTask = new Task('Tarea Actualizada', undefined, undefined, undefined, undefined, 1);
      await service.actualizarTarea(updatedTask);
      
      const task = service['tareas'].find(t => t.idPropio === 1);
      expect(task?.titulo).toBe('Tarea Actualizada');
    });
  });

  describe('cambiarEstadoTarea', () => {
    it('debería cambiar estado de ABIERTA a TERMINADA', async () => {
      await service.cambiarEstadoTarea(1);
      const task = service['tareas'].find(t => t.idPropio === 1);
      expect(task?.estado).toBe(TaskEstado.TERMINADA);
    });
  });

  describe('eliminarTarea', () => {
    it('debería eliminar la tarea especificada', () => {
      service.eliminarTarea(1);
      expect(service['tareas'].length).toBe(1);
    });
  });

  describe('obtenerTodasLasTareas', () => {
    it('debería obtener tareas del servidor', async () => {
      (window.fetch as jasmine.Spy).and.returnValue(
        Promise.resolve(new Response(JSON.stringify({ tasks: [{ id: 1 }] }), { status: 200 }))
      );

      const tasks = await service.obtenerTodasLasTareas();
      expect(tasks.length).toBe(1);
    });
  });

  describe('crearRespaldo', () => {
    it('debería enviar tareas al servidor', async () => {
      await service['crearRespaldo']();
      expect(window.fetch).toHaveBeenCalled();
    });
  });
});
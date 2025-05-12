import { TestBed } from '@angular/core/testing';
import { ListasService } from '../services/listas.service';
import { TareasService } from '../services/tareas.service';

describe('ListasService', () => {
  let service: ListasService;
  let tareasServiceSpy: jasmine.SpyObj<TareasService>;

  beforeEach(() => {
    // Mock de localStorage ANTES de instanciar el servicio
    spyOn(localStorage, 'getItem').and.returnValue(JSON.stringify(['Lista1', 'Lista2']));
    spyOn(localStorage, 'setItem').and.callThrough();

    // Creamos un mock de TareasService
    const spy = jasmine.createSpyObj('TareasService', [
      'actualizarListaDeTareasConLista',
      'obtenerTareaConLista'
    ]);

    TestBed.configureTestingModule({
      providers: [
        ListasService,
        { provide: TareasService, useValue: spy }
      ]
    });

    service = TestBed.inject(ListasService);
    tareasServiceSpy = TestBed.inject(TareasService) as jasmine.SpyObj<TareasService>;
  });

  afterEach(() => {
    // Limpiar todos los spies
    (localStorage.getItem as jasmine.Spy).and.callThrough();
    (localStorage.setItem as jasmine.Spy).and.callThrough();
  });

  it('debería crearse el servicio', () => {
    expect(service).toBeTruthy();
    // Verificamos que se cargaron las listas iniciales
    expect(service.listas).toEqual(['Lista1', 'Lista2']);
  });

  describe('crearNuevaLista', () => {
    it('debería agregar una nueva lista si no existe', async () => {
      await service.crearNuevaLista('NuevaLista');
      expect(service.listas).toContain('NuevaLista');
      expect(localStorage.setItem).toHaveBeenCalledWith('listas', JSON.stringify(['Lista1', 'Lista2', 'NuevaLista']));
    });

    it('debería lanzar un error si la lista ya existe', async () => {
      await expectAsync(service.crearNuevaLista('Lista1')).toBeRejectedWithError('La lista ya existe 😒😒😒😒');
    });
  });

  describe('actualizarNombreTarea', () => {
    it('debería actualizar el nombre de la lista y las tareas asociadas', async () => {
      tareasServiceSpy.actualizarListaDeTareasConLista.and.returnValue(Promise.resolve());
      
      await service.actualizarNombreTarea('ListaActualizada', 'Lista1');
      
      expect(tareasServiceSpy.actualizarListaDeTareasConLista).toHaveBeenCalledWith('Lista1', 'ListaActualizada');
      
      // Verificación más robusta del cambio de nombre
      const index = service.listas.indexOf('ListaActualizada');
      expect(index).toBeGreaterThanOrEqual(0);
      expect(service.listas).not.toContain('Lista1');
      
      expect(localStorage.setItem).toHaveBeenCalledWith('listas', JSON.stringify(service.listas));
    });
  });

  describe('eliminarNombreLista', () => {
    it('debería eliminar la lista y limpiar el nombre en las tareas asociadas', async () => {
      const mockTareas = [{ nombreLista: 'Lista1' }, { nombreLista: 'Lista1' }];
      tareasServiceSpy.obtenerTareaConLista.and.returnValue(Promise.resolve(mockTareas));
      
      await service.eliminarNombreLista('Lista1');
      
      expect(tareasServiceSpy.obtenerTareaConLista).toHaveBeenCalledWith('Lista1');
      expect(service.listas).not.toContain('Lista1');
      mockTareas.forEach(t => expect(t.nombreLista).toBe(''));
      expect(localStorage.setItem).toHaveBeenCalled();
    });
  });

  describe('obtenerListas', () => {
    it('debería devolver las listas existentes', async () => {
      const listas = await service.obtenerListas();
      expect(listas).toEqual(jasmine.arrayContaining(['Lista1', 'Lista2']));
      expect(listas.length).toBe(2);
    });
  });
});
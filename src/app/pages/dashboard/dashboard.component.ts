import { BootstrapOptions, Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { BotonAgregarTareaComponent } from "../../components/boton-agregar-tarea/boton-agregar-tarea.component";
import Task, { TaskEstado } from '../../entities/Task';
import { TareasService } from '../../services/tareas.service';
import { TaskComponentComponent } from "../../components/task-component/task-component.component";
import { Router } from '@angular/router';
import { ServicioUsuario } from '../../services/ServicioUsuario';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import dayGridPlugin from '@fullcalendar/daygrid';
import { Modal } from 'bootstrap';

//Fomato de las tareas que se van a mostrar en el calendario
type TareaCalendarFormat = {
  title?: string;
  date?: string;
};

@Component({
  selector: 'app-dashboard',
  imports: [ FullCalendarModule,HeaderComponent, SidebarComponent, BotonAgregarTareaComponent, TaskComponentComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {


  tareasAbiertas: Task[] = [];
  tareasTerminadas: Task[] = [];

  //Variable para manejar las tareas en el calendario
  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin],
    events: [],
    eventClick: (info) => this.handleDateClick(info)
  };
  //Tareas para el calendario
  tareasCalendario: TareaCalendarFormat[] = [];
  selectedEvent: any;
  showMiniModal = false;


  constructor(
    private tareaService: TareasService,
    private usuarioService: ServicioUsuario,
    private router: Router
  ) { }

  async ngOnInit() {

    const usuario = this.usuarioService.getCurrentUser();

    if (usuario == null) {
      this.router.navigate(['']);
      return;
    }

    //Obtenemos las tareas del usuario
    const tareas = await this.tareaService.obtenerTodasLasTareas();
    
    this.tareasCalendario = tareas.map((t: any) => {
      const originalDate = new Date(t.endDate ?? '2025-01-01');
      const formattedDate = originalDate.toISOString().split('T')[0];
      return {
        title: t.title ?? 'Sin título',
        date: formattedDate
      };
    });


    // Asignar las tareas al calendario
    this.calendarOptions.events = [...this.tareasCalendario];

    await this.actualizarVista();
  }

  async actualizarVista() {
    const tareas = await this.tareaService.obtenerTodasLasTareas();
    this.tareasAbiertas = tareas.filter(t => t.estado === TaskEstado.ABIERTA);
    this.tareasTerminadas = tareas.filter(t => t.estado === TaskEstado.TERMINADA);
  }

  editarTarea(tarea: Task) {
    this.tareaService.guardarTareaAEditar(tarea);
    this.router.navigate(['agregar'])
  }

  async terminarTarea(tarea: Task) {
    this.tareaService.cambiarEstadoTarea(tarea.idPropio!);
    //fire a sound effect
    await this.actualizarVista();
  }

  async abrirTarea(tarea: Task) {
    this.tareaService.cambiarEstadoTarea(tarea.idPropio!);
    await this.actualizarVista();    
  }

  handleDateClick(info: any){
    this.selectedEvent = info.event; 
    const modalElement = document.getElementById('eventModal');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }

  }

}

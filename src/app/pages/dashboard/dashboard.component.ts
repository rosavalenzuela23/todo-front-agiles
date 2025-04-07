import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { BotonAgregarTareaComponent } from "../../components/boton-agregar-tarea/boton-agregar-tarea.component";

@Component({
  selector: 'app-dashboard',
  imports: [HeaderComponent, SidebarComponent, BotonAgregarTareaComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}

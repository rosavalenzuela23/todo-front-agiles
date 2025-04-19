import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { SidebarComponent } from "../../components/sidebar/sidebar.component";
import { Modal } from 'bootstrap';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ListasService } from '../../services/listas.service';

@Component({
  selector: 'app-listas',
  imports: [HeaderComponent, SidebarComponent, ReactiveFormsModule],
  templateUrl: './listas.component.html',
  styleUrl: './listas.component.css'
})
export class ListasComponent {

  nombreLista: FormControl = new FormControl("", Validators.required);

  nombresListas: string[] = [];

  constructor(
    private listaService: ListasService
  ) { }

  async ngOnInit() {
    await this.actualizarVista();
  }

  async guardarNombreLista(event: Event) {

    event.preventDefault();

    if (this.nombreLista.errors != null) {
      alert("Por favor, ingrese el nombre de la categoría");
      return;
    }

    await this.listaService.crearNuevaLista(this.nombreLista.value)
    .catch( e => {
      alert(e);
      throw new Error('');
    });

    alert("La lista se agrego con exito!");
    await this.actualizarVista();
  }

  async actualizarVista() {
    const listas = await this.listaService.obtenerListas();
    this.nombresListas = listas;
  }

}

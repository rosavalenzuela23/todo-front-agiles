import { Component } from '@angular/core';
import { ServicioUsuario } from '../../services/ServicioUsuario';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  nombreUsuario: string = "[PRUEBAS]";

  constructor(
    private usuarioService: ServicioUsuario
  ){}

  ngOnInit() {
    const usuario = this.usuarioService.getCurrentUser();

    if(usuario == null) {
      return;
    }

    this.nombreUsuario = usuario.username!;
  }

}

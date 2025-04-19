import { Component } from '@angular/core';
import {ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import Usuario from '../../entities/Usuario';
import { inject } from "@angular/core";
import { ServicioUsuario } from '../../services/ServicioUsuario';
import {customEmailValidator} from '../../utilities/Validators';

@Component({
  selector: 'app-iniciarsesion',
  imports: [ReactiveFormsModule],
  templateUrl: './iniciarsesion.component.html',
  styleUrls: ['./iniciarsesion.component.css']
})
export class IniciarSesionComponent {

  //Variables
  usuario: Usuario;
  
  //Form handler
  userForm = new FormGroup({
    password: new FormControl(undefined, Validators.required),
    email: new FormControl(undefined, [Validators.required, Validators.email])
  })

  constructor(private servicioUsuario: ServicioUsuario) {
    
    this.usuario = new Usuario();
  }


  async iniciarSesion(){

    if(this.userForm.invalid){
      console.log("Formulario inválido");
      return;
    }
    
    this.usuario.password = this.userForm.get("password")?.value!;
    this.usuario.email = this.userForm.get("email")?.value!;
   
    const response = await this.servicioUsuario.iniciarSesion(this.usuario);

    if(response){
      alert("log in exitoso");
    }
  }

}

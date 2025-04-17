import { Component } from '@angular/core';
import {ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import Usuario from '../../entities/Usuario';
import { inject } from "@angular/core";
import { ServicioUsuario } from '../../services/ServicioUsuario';

@Component({
  selector: 'app-registrarusuario',
  imports: [ReactiveFormsModule],
  templateUrl: './registrarusuario.component.html',
  styleUrls: ['./registrarusuario.component.css']
})
export class RegistrarusuarioComponent {

  //Variables
  usuario: Usuario;
  
  //Form handler
  userForm = new FormGroup({

    nombre: new FormControl(undefined, Validators.required),
    usuario: new FormControl(undefined, Validators.required),
    password: new FormControl(undefined, Validators.required),
    email: new FormControl(undefined, Validators.required),
    fechaNacimiento: new FormControl(undefined, Validators.required)
  })

  constructor(private servicioUsuario: ServicioUsuario) {
    
    this.usuario = new Usuario();
  }


  async registrarUsuario(){

    if(this.userForm.invalid){
      console.log("Formulario inválido");
      return;
    }
    
    this.usuario.nombre = this.userForm.get("nombre")?.value!;
    this.usuario.usuario = this.userForm.get("usuario")?.value!;
    this.usuario.password = this.userForm.get("password")?.value!;
    this.usuario.email = this.userForm.get("email")?.value!;
    this.usuario.fechaNacimiento = this.userForm.get("fechaNacimiento")?.value!;

    const response = await this.servicioUsuario.registrarUsuario(this.usuario);

    if(response){
      alert("Usuario registrado correctamente");
    }
  }

}

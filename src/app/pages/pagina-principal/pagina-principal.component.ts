import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ServicioUsuario } from '../../services/ServicioUsuario';
import Usuario from '../../entities/Usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-principal',
  imports: [ReactiveFormsModule],
  templateUrl: './pagina-principal.component.html',
  styleUrl: './pagina-principal.component.css'
})
export class PaginaPrincipalComponent {

  loginForm = new FormGroup({
    password: new FormControl(undefined, Validators.required),
    email: new FormControl(undefined, [Validators.required, Validators.email])
  });

  registerForm = new FormGroup({
    usuario: new FormControl(undefined, Validators.required),
    password: new FormControl(undefined, Validators.required),
    email: new FormControl(undefined, [Validators.required, Validators.email]),
  });

  constructor(
    private usuarioService: ServicioUsuario,
    private router: Router
  ) { }

  ngOnInit() {
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    if (signUpButton == null || signInButton == null || container == null) {
      throw new Error("No se cargo bien la pagina");
    }

    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
    });

    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
    });
  }

  async iniciarSesion() {

    if (this.loginForm.invalid) {
      console.log("Formulario inválido");
      return;
    }

    const usuario = new Usuario();
    usuario.password = this.loginForm.get("password")?.value!;
    usuario.email = this.loginForm.get("email")?.value!;

    const response = await this.usuarioService.iniciarSesion(usuario);

    this.router.navigate(["/dashboard"]);
  }

  async registrarUsuario() {

    if (this.registerForm.invalid) {
      console.log("Formulario inválido");
      return;
    }

    const usuario = new Usuario();

    usuario.username = this.registerForm.get("usuario")?.value!;
    usuario.password = this.registerForm.get("password")?.value!;
    usuario.email = this.registerForm.get("email")?.value!;

    const response = await this.usuarioService.registrarUsuario(usuario);

    if (response) {
      alert("Usuario registrado correctamente, favor de iniciar sesión");
      const signInButton = document.getElementById('signIn');
      signInButton!.click();
    }
  }

}

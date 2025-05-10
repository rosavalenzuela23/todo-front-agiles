import { Injectable } from '@angular/core';
import Usuario from '../entities/Usuario';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ServicioUsuario {
  private currentUser: Usuario | null = null;
  private accessToken: string | null = null;

  private loginEndpoint = "http://localhost:3000/auth/login";
  private registerEndpoint = "http://localhost:3000/auth/register";

  constructor(private httpClient: HttpClient) { }

  async registrarUsuario(usuario: Usuario): Promise<any> {

    type registerBody = {
      email: string;
      password: string;
      username: string;
    }

    const body: registerBody = {
      email: usuario.email!,
      password: usuario.password!,
      username: usuario.usuario!
    }

    try {
      const response = await lastValueFrom(this.httpClient.post<Usuario>(
        this.registerEndpoint, body
      ));

      if (!response.email) {
        throw new Error("No se pudo registrar el usuario");
      }

      return usuario;
    } catch (error) {
      alert("Error al registrar el usuario");
      throw new Error("Error al registrar el usuario");
    }

  }

  async iniciarSesion(usuario: Usuario): Promise<void> {

    type inicioSesionResponse = {
      access_token: string;
      user: Usuario;
    }

    const res = await lastValueFrom(this.httpClient.post<inicioSesionResponse>(
      this.loginEndpoint,
      usuario
    ));

    if (!res.access_token || !res.user) {
      throw new Error("No se pudo iniciar sesión");
    }

  }

  getCurrentUser(): Usuario | null {
    return this.currentUser;
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  isLoggedIn(): boolean {
    return this.accessToken !== null;
  }

}
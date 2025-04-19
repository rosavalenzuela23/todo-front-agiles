import { Injectable } from '@angular/core';
import Usuario from '../entities/Usuario';

@Injectable({
  providedIn: 'root',
})
export class ServicioUsuario {



    async registrarUsuario(usuario: Usuario): Promise<any> {
    
        console.log(usuario);
    
        return usuario;
    }


    async iniciarSesion(usuario: Usuario): Promise<any> {

      console.log(usuario);

      return usuario;
    }

}
import { Routes } from '@angular/router';
import { NotFound404Component } from './pages/not-found404/not-found404.component';
import { MistareasComponent } from './pages/mistareas/mistareas.component';
import { AgregarTareaComponent } from './pages/agregar-tarea/agregar-tarea.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import {RegistrarusuarioComponent} from './pages/registrar-usuario/registrarusuario.component';
import { IniciarSesionComponent } from './pages/iniciar-sesion/iniciarsesion.component';

export const routes: Routes = [
    { path: "dashboard", component: DashboardComponent },
    { path: "agregar", component: AgregarTareaComponent },
    { path: "editar", component: AgregarTareaComponent },
    { path: "mistareas", component: MistareasComponent },
    {path: "registrar", component: RegistrarusuarioComponent},
    {path: "login", component: IniciarSesionComponent},
    { path: "**", component: NotFound404Component }
];

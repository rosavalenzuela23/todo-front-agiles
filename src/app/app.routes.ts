import { Routes } from '@angular/router';
import { NotFound404Component } from './pages/not-found404/not-found404.component';
import { MistareasComponent } from './pages/mistareas/mistareas.component';

export const routes: Routes = [
    { path: "mistareas", component: MistareasComponent },
    { path: "**", component: NotFound404Component }
];

import { Routes } from '@angular/router';
import { NotFound404Component } from './pages/not-found404/not-found404.component';

export const routes: Routes = [
    { path: "**", component: NotFound404Component }
];

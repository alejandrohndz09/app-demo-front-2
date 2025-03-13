import { Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {DepartamentoComponent} from './components/departamento/departamento.component';

export const routes: Routes = [
  {path: '', redirectTo: '/departamentos', pathMatch: 'full'},
  {path: 'departamentos', component: DepartamentoComponent},

];

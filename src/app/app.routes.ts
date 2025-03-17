import { Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {DepartamentoComponent} from './components/departamento/departamento.component';
import {DistritoComponent} from './components/distrito/distrito.component';
import {Departamento} from './models/departamento.model';

export const routes: Routes = [
  {path: '', redirectTo: '/departamentos', pathMatch: 'full'},
  {path: 'departamentos', component: DepartamentoComponent},
  {path: 'distritos', component: DistritoComponent},


];

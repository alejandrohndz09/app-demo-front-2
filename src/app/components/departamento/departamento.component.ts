import {Component} from '@angular/core';
import {Button} from "primeng/button";
import {Card} from "primeng/card";
import {TableModule} from 'primeng/table';
import {MiMenuComponent} from '../generics/menu/toggle-menu.component';
import {Departamento} from '../../models/departamento.model';
import {Toast} from 'primeng/toast';
import {MessageService} from 'primeng/api';
import {DepartamentoDataService} from '../../services/departamento-data.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Tooltip} from 'primeng/tooltip';
import {Dialog} from 'primeng/dialog';
import {InputText} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {FloatLabel} from 'primeng/floatlabel';
import {InputMask} from 'primeng/inputmask';
import {DepartamentoFormularioComponent} from './departamento-formulario/departamento-formulario.component';

@Component({
  selector: 'app-departamento',
  imports: [
    Button,
    Card,
    TableModule,
    MiMenuComponent,
    Toast,
    HttpClientModule,
    Tooltip,
    Dialog,
    InputText,
    FormsModule,
    FloatLabel,
    InputMask,
    DepartamentoFormularioComponent
  ],
  providers: [MessageService, DepartamentoDataService],
  templateUrl: './departamento.component.html',
  styles: ``
})
export class DepartamentoComponent {
  departamentos!: Departamento[];
  departamento!: Departamento;
  visible: boolean=false;


  constructor(private dataServices: DepartamentoDataService, private messageService: MessageService) {
    this.dataServices.getAll("").subscribe(
      departamentos => (this.departamentos = departamentos),
      error => this.messageService.add(error)
    );
    this.departamento=new Departamento();
  }

  actualizarLista(departamento: Departamento) {

      const index = this.departamentos.findIndex(d => d.id === departamento.id);
      if (index !== -1) {
        this.departamentos[index] = departamento;
      }else{
        this.departamentos.push(departamento);
      }
    this.messageService.add({ severity: 'info', detail: 'Operación exitosa' })
    this.departamento=new Departamento();

  }
}

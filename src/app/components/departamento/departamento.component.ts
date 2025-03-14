import {Component} from '@angular/core';
import {Button} from "primeng/button";
import {Card} from "primeng/card";
import {TableModule} from 'primeng/table';
import {MiMenuComponent} from '../generics/menu/toggle-menu.component';
import {Departamento} from '../../models/departamento.model';
import {Toast} from 'primeng/toast';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DepartamentoDataService} from '../../services/departamento-data.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Tooltip} from 'primeng/tooltip';
import {Dialog} from 'primeng/dialog';
import {InputText} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {FloatLabel} from 'primeng/floatlabel';
import {InputMask} from 'primeng/inputmask';
import {DepartamentoFormularioComponent} from './departamento-formulario/departamento-formulario.component';
import {ConfirmDialog} from 'primeng/confirmdialog';

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
    FormsModule,
    DepartamentoFormularioComponent,
    ConfirmDialog
  ],
  providers: [MessageService, DepartamentoDataService, ConfirmationService],
  templateUrl: './departamento.component.html',
  styles: ``
})
export class DepartamentoComponent {
  departamentos!: Departamento[];
  departamento: Departamento;
  visible: boolean = false;


  constructor(private dataServices: DepartamentoDataService, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.dataServices.getAll("").subscribe(
      departamentos => (this.departamentos = departamentos),
      error => this.messageService.add(error)
    );
    this.departamento = new Departamento();
  }

  actualizarLista(departamento: Departamento) {

    const index = this.departamentos.findIndex(d => d.id === departamento.id);
    if (index !== -1) {
      this.departamentos[index] = departamento;
    } else {
      this.departamentos.push(departamento);
    }
    this.messageService.add({
      severity: 'success', summary: "Operación exitosa", detail: 'Se han guardado los' +
        ' cambios.'
    })
    this.departamento = new Departamento();
  }

  editar(dep: any) {
    this.departamento = dep;
    this.visible = true;
  }

  eliminar(event: Event, id: number) {

    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: '¿Está seguro que desea eliminar el registro?',
      header: 'Confirmación',
      closable: true,
      closeOnEscape: true,
      icon: 'pi pi-exclamation-triangle',
      rejectButtonProps: {
        label: 'Cancelar',
        severity: 'secondary',
      },
      acceptButtonProps: {
        label: 'Confirmar',
      },
      accept: () => {
        this.dataServices.delete("", id).subscribe(
          result => {
            this.messageService.add({
              severity: 'success', summary: 'Operación exitosa', detail: 'Se ha eliminado el' +
                ' registro.'
            });
            this.departamentos = this.departamentos.filter(d => d.id !== id);
          },
          error => {
            if (error.error && error.message) {
              console.log(error);
              this.messageService.add({severity: 'error', summary: 'Ocurrió un error', detail: error.error.message});
            } else {
              this.messageService.add({severity: 'error', summary: 'Ocurrió un error', detail: 'Error desconocido.'});
            }
          }
        );
      }
    });
  }
}

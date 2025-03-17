import {Component} from '@angular/core';
import {Button} from "primeng/button";
import {Card} from "primeng/card";
import {TableModule} from 'primeng/table';
import {MiMenuComponent} from '../generics/menu/toggle-menu.component';
import {Distrito} from '../../models/distrito.model';
import {Toast} from 'primeng/toast';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DistritoDataService} from '../../services/distrito-data.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Tooltip} from 'primeng/tooltip';
import {Dialog} from 'primeng/dialog';
import {InputText} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {FloatLabel} from 'primeng/floatlabel';
import {InputMask} from 'primeng/inputmask';
import {DistritoFormularioComponent} from './distrito-formulario/distrito-formulario.component';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {MunicipioDataService} from '../../services/municipio-data.service';

@Component({
  selector: 'app-distrito',
  imports: [
    Button,
    Card,
    TableModule,
    MiMenuComponent,
    Toast,
    HttpClientModule,
    Tooltip,
    FormsModule,
    DistritoFormularioComponent,
    ConfirmDialog
  ],
  providers: [MessageService, DistritoDataService, MunicipioDataService, ConfirmationService],
  templateUrl: './distrito.component.html',
  styles: ``
})
export class DistritoComponent {
  distritos!: Distrito[];
  distrito: Distrito;
  visible: boolean = false;


  constructor(private dataServices: DistritoDataService, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.dataServices.getAll("").subscribe(
      distritos => (this.distritos = distritos),
      error => this.messageService.add(error)
    );
    this.distrito = new Distrito();
  }

  actualizarLista(distrito: Distrito) {

    const index = this.distritos.findIndex(d => d.id === distrito.id);
    if (index !== -1) {
      this.distritos[index] = distrito;
    } else {
      this.distritos.push(distrito);
    }
    this.messageService.add({
      severity: 'success', summary: "Operación exitosa", detail: 'Se han guardado los' +
        ' cambios.'
    })
    this.distrito = new Distrito();
  }

  editar(dep: any) {
    this.distrito = dep;
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
            this.distritos = this.distritos.filter(d => d.id !== id);
          },
          error => {
            if (error.error && error.error.message) {
              console.log(error);
              this.messageService.add({severity: 'info', summary: 'Operación denegada', detail: error.error.message});
            } else {
              this.messageService.add({severity: 'error', summary: 'Ocurrió un error', detail: 'Error desconocido.'});
            }
          }
        );
      }
    });
  }
}

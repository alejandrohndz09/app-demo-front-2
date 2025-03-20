import {Component} from '@angular/core';
import {Button} from "primeng/button";
import {Card} from "primeng/card";
import {TableModule} from 'primeng/table';
import {MiMenuComponent} from '../generics/menu/toggle-menu.component';
import {Municipio} from '../../models/municipio.model';
import {Toast} from 'primeng/toast';
import {ConfirmationService, MessageService} from 'primeng/api';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Tooltip} from 'primeng/tooltip';
import {Dialog} from 'primeng/dialog';
import {InputText} from 'primeng/inputtext';
import {FormsModule} from '@angular/forms';
import {FloatLabel} from 'primeng/floatlabel';
import {InputMask} from 'primeng/inputmask';
import {MunicipioFormularioComponent} from './municipio-formulario/municipio-formulario.component';
import {ConfirmDialog} from 'primeng/confirmdialog';
import {MunicipioDataService} from '../../services/municipio-data.service';
import {DepartamentoDataService} from '../../services/departamento-data.service';

@Component({
  selector: 'app-municipio',
  imports: [
    Button,
    Card,
    TableModule,
    MiMenuComponent,
    Toast,
    HttpClientModule,
    Tooltip,
    FormsModule,
    MunicipioFormularioComponent,
    ConfirmDialog
  ],
  providers: [MessageService, MunicipioDataService, DepartamentoDataService, ConfirmationService],
  templateUrl: './municipio.component.html',
  styles: ``
})
export class MunicipioComponent {
  municipios!: Municipio[];
  municipio: Municipio;
  visible: boolean = false;


  constructor(private dataServices: MunicipioDataService, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.dataServices.getAll("").subscribe(
      municipios => (this.municipios = municipios),
      error => this.messageService.add(error)
    );
    this.municipio = new Municipio();
  }

  actualizarLista(municipio: Municipio) {

    const index = this.municipios.findIndex(d => d.id === municipio.id);
    if (index !== -1) {
      this.municipios[index] = municipio;
    } else {
      this.municipios.push(municipio);
    }
    this.messageService.add({
      severity: 'success', summary: "Operación exitosa", detail: 'Se han guardado los' +
        ' cambios.'
    })
    this.municipio = new Municipio();
  }

  editar(dep: any) {
    this.municipio = dep;
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
            this.municipios = this.municipios.filter(d => d.id !== id);
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

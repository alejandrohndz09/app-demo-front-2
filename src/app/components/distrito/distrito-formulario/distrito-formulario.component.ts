import {Component, EventEmitter, Input, model, Output} from '@angular/core';
import {Button} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {FloatLabel} from 'primeng/floatlabel';
import {InputMask} from 'primeng/inputmask';
import {InputText} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Distrito} from '../../../models/distrito.model';
import {DistritoDataService} from '../../../services/distrito-data.service';
import {NgClass, NgIf} from '@angular/common';
import {MessageService} from 'primeng/api';
import {Municipio} from '../../../models/municipio.model';
import {Select} from 'primeng/select';
import {MunicipioDataService} from '../../../services/municipio-data.service';
import {HttpClientModule} from '@angular/common/http';


@Component({
  selector: 'distrito-formulario',
  imports: [
    Button,
    Dialog,
    FloatLabel,
    InputMask,
    InputText,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgClass,
    NgIf,
    Select
  ],
  templateUrl: './distrito-formulario.component.html',
  styles: ``
})
export class DistritoFormularioComponent {
  @Input() distrito!: Distrito;
  @Input() visible!: boolean;
  @Output() onHide = new EventEmitter<boolean>();
  @Output() onSave = new EventEmitter<Distrito>();
  municipios!: Municipio[];
  errors: { field: string, message: string } [] = [];

  constructor(private distritoService: DistritoDataService, private municipioService: MunicipioDataService, private messageService: MessageService) {
    this.municipioService.getAll("").subscribe(
      result => {
        this.municipios = this.agruparMunicipiosPorDepartamento(result);
      },
      error => console.log(error)
    )
  }

  private agruparMunicipiosPorDepartamento(municipios: any[]): any[] {
    // Creamos un arreglo donde cada objeto contiene un departamento y su lista de municipios
    const departamentos: any[] = [];

    // Agrupamos los municipios por departamento
    municipios.forEach(municipio => {
      const departamento = municipio.departamento.nombre;

      // Verificamos si el departamento ya existe en el arreglo
      let departamentoExistente = departamentos.find(dep => dep.label === departamento);

      // Si no existe, lo creamos
      if (!departamentoExistente) {
        departamentoExistente = {
          label: departamento,
          items: []
        };
        departamentos.push(departamentoExistente);
      }

      // Agregamos el municipio al departamento correspondiente
      departamentoExistente.items.push({
        label: municipio.nombre,
        value: municipio.id
      });
    });
    return departamentos;
  }

  convertToUpperCase() {
    this.distrito.codigo = this.distrito.codigo?.toUpperCase()
  }

  guardar(distrito: Distrito) {
    if (!distrito.id) {
      this.distritoService.create("", distrito).subscribe(
        data => {
          this.visible = false;
          this.errors = [];
          this.onSave.emit(data);
        },
        error => {
          if (error.error && error.error.violations) {
            this.errors = error.error.violations.map((v: any) => ({
              field: v.field.split('.').pop(),
              message: v.message
            }));
          }
        }
      )
    } else {
      this.distritoService.update("", distrito.id, distrito).subscribe(
        data => {
          this.visible = false;
          this.errors = [];
          this.onSave.emit(data);
        },
        error => {
          if (error.error && error.error.violations) {
            this.errors = error.error.violations.map((v: any) => ({
              field: v.field.split('.').pop(),
              message: v.message
            }));
          } else {
            this.messageService.add({severity: 'error', summary: error.message, detail: error});
          }
        }
      )
    }

  }

  cerrar() {
    this.visible = false;
    this.errors = [];
    this.onHide.emit(this.visible);
  }

  // Función auxiliar para obtener el mensaje de error de un campo
  getError(field: string): string | null {
    return this.errors.find(e => e.field === field)?.message || null;
  }

// Función para verificar si un campo tiene error
  hasError(field: string): boolean {
    return this.errors.some(e => e.field === field);
  }
}

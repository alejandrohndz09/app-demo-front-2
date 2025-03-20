import {Component, EventEmitter, Input, model, Output} from '@angular/core';
import {Button} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {FloatLabel} from 'primeng/floatlabel';
import {InputMask} from 'primeng/inputmask';
import {InputText} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Municipio} from '../../../models/municipio.model';
import {MunicipioDataService} from '../../../services/municipio-data.service';
import {NgClass, NgIf} from '@angular/common';
import {MessageService} from 'primeng/api';
import {Select} from 'primeng/select';
import {HttpClientModule} from '@angular/common/http';
import {Departamento} from '../../../models/departamento.model';
import {DepartamentoDataService} from '../../../services/departamento-data.service';


@Component({
  selector: 'municipio-formulario',
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
  templateUrl: './municipio-formulario.component.html',
  styles: ``
})
export class MunicipioFormularioComponent {
  @Input() municipio!: Municipio;
  @Input() visible!: boolean;
  @Output() onHide = new EventEmitter<boolean>();
  @Output() onSave = new EventEmitter<Municipio>();
  departamentos!: Departamento[];
  errors: { field: string, message: string } [] = [];

  constructor(private municipioService: MunicipioDataService, private departamentoService: DepartamentoDataService, private messageService: MessageService) {
    this.departamentoService.getAll("").subscribe(
      result => {
        this.departamentos = this.agruparMunicipiosPorDepartamento(result);
      },
      error => console.log(error)
    )
  }

  private agruparMunicipiosPorDepartamento(registros: any[]): any[] {
    const departamentos: any[] = [];
    registros.forEach(departamento => {
        let dep = {
          label: departamento.nombre,
          value: departamento.id,
        };
        departamentos.push(dep);
    });
    return departamentos;
  }

  convertToUpperCase() {
    this.municipio.codigo = this.municipio.codigo?.toUpperCase()
  }

  guardar(municipio: Municipio) {
    if (!municipio.id) {
      this.municipioService.create("", municipio).subscribe(
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
      this.municipioService.update("", municipio.id, municipio).subscribe(
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

import {Component, EventEmitter, Input, model, Output} from '@angular/core';
import {Button} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {FloatLabel} from 'primeng/floatlabel';
import {InputMask} from 'primeng/inputmask';
import {InputText} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Departamento} from '../../../models/departamento.model';
import {DepartamentoDataService} from '../../../services/departamento-data.service';
import {NgClass, NgIf} from '@angular/common';
import {MessageService} from 'primeng/api';

@Component({
  selector: 'departamento-formulario',
  imports: [
    Button,
    Dialog,
    FloatLabel,
    InputMask,
    InputText,
    ReactiveFormsModule,
    FormsModule,
    NgClass,
    NgIf
  ],
  templateUrl: './departamento-formulario.component.html',
  styles: ``
})
export class DepartamentoFormularioComponent {
  @Input() departamento!: Departamento;
  @Input() visible!: boolean;
  @Output() onHide = new EventEmitter<boolean>();
  @Output() onSave = new EventEmitter<Departamento>();
  errors: { field: string, message: string } [] = [];

  constructor(private departamentoService: DepartamentoDataService, private messageService: MessageService) {
  }

  convertToUpperCase() {
    this.departamento.codigo = this.departamento.codigo?.toUpperCase()
  }

  guardar(departamento: Departamento) {
    if (!departamento.id) {
      this.departamentoService.create("", departamento).subscribe(
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
    }else{
      this.departamentoService.update("", departamento.id,departamento).subscribe(
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
          }else{
            this.messageService.add({severity: 'error', summary:error.message, detail: error});
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

import {Component, EventEmitter, Input, model, Output} from '@angular/core';
import {Button} from 'primeng/button';
import {Dialog} from 'primeng/dialog';
import {FloatLabel} from 'primeng/floatlabel';
import {InputMask} from 'primeng/inputmask';
import {InputText} from 'primeng/inputtext';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Departamento} from '../../../models/departamento.model';
import {DepartamentoDataService} from '../../../services/departamento-data.service';

@Component({
  selector: 'departamento-formulario',
  imports: [
    Button,
    Dialog,
    FloatLabel,
    InputMask,
    InputText,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './departamento-formulario.component.html',
  styles: ``
})
export class DepartamentoFormularioComponent {
  @Input() departamento!: Departamento;
  @Input() visible!: boolean;
  @Output() onHide = new EventEmitter<boolean>();
  @Output() onSave = new EventEmitter<Departamento>();
  errors=[]

  constructor(private departamentoService: DepartamentoDataService) {

  }

  convertToUpperCase() {
    //this.departamento.codigo=this.departamento.codigo?.toUpperCase()
  }

  guardar(departamento: Departamento) {
console.log(this.departamento);
    this.departamentoService.create("",departamento).subscribe(
      data => {
        this.onSave.emit(data);
      },
      error => {
        console.log(error);
      }
    )
  }
}

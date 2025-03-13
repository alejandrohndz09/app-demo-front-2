import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {TieredMenu} from 'primeng/tieredmenu';
import {Button} from 'primeng/button';

@Component({
  selector: 'toggle-menu',
  standalone: true,
  imports: [
    TieredMenu,
    Button
  ],
  templateUrl: './toggle-menu.component.html'
})
export class MiMenuComponent {
  items: MenuItem[] = [];

  constructor() {
    // Definiendo los ítems manualmente
    this.items = [
      {
        label: 'Elija el formato:',
        disabled: true,
        style:{'font-weight': 'bold', 'color': '#fff', }
      },
      {
        label: 'Pdf',
        icon: 'pi pi-file-pdf',
        iconStyle: {color: 'var(--p-red-400)', }
      },
      {
        label: 'Word',
        icon: 'pi pi-file-word',
        iconStyle:{color: "var(--p-blue-400)" },
      },
      {
        label: 'Excel',
        icon: 'pi pi-file-excel',
        iconStyle:{color: "var(--p-green-400)" },
      }
    ];
  }
}

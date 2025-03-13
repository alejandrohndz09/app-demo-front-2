import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Router, RouterLink} from '@angular/router';
import {MenuModule} from 'primeng/menu';
import {NgIf} from '@angular/common';
import {Card} from 'primeng/card';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  standalone: true,
  imports: [MenuModule, RouterLink, NgIf, Card]
})
export class MenuComponent {
  items: MenuItem[] | undefined;

  constructor(private router: Router) {
    this.items = [
      {
        label: 'Menu',
        items: [
          {
            label: 'Inicio',
            icon: 'pi pi-home',
            route: ''
          },
          {
            label: 'Departamentos',
            icon: 'pi pi-map',
            command: () => {
              this.router.navigate(['/departamentos']);
            }
          },
          {
            label: 'Municipios',
            icon: 'pi pi-map-marker',
            command: () => {
              this.router.navigate(['/municipios']);
            }
          },
          {
            label: 'Distritos',
            icon: 'pi pi-clone',
            command: () => {
              this.router.navigate(['/distritos']);
            }
          }
        ]
      }
    ];
  }
}

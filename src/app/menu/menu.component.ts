import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {Router, RouterLink} from '@angular/router';
import {MenuModule} from 'primeng/menu';
import {NgIf} from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  standalone: true,
  imports: [MenuModule, RouterLink, NgIf]
})
export class MenuComponent {
  items: MenuItem[] | undefined;

  constructor(private router: Router) {
    this.items = [
      {
        label: 'Navigate',
        items: [
          {
            label: 'Router Link',
            icon: 'pi pi-palette',
            route: ''
          },
          {
            label: 'Programmatic',
            icon: 'pi pi-link',
            command: () => {
              this.router.navigate(['/']);
            }
          },
          {
            label: 'External',
            icon: 'pi pi-home',
            url: 'https://angular.io//'
          }
        ]
      }
    ];
  }
}

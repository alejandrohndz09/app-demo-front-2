import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {MenuComponent} from './menu/menu.component';

@Component({
  selector: 'app-root',
  imports: [ButtonModule, CardModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'appdemo2';
}

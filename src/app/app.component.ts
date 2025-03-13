import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ButtonModule} from 'primeng/button';
import {CardModule} from 'primeng/card';
import {MenuComponent} from './components/generics/menu/menu.component';

@Component({
  selector: 'app-root',
  imports: [ButtonModule, CardModule, MenuComponent, RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'appdemo2';
}

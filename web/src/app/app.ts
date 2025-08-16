import {Component} from '@angular/core';
import {Header} from './header/header';
import {TokenCalculator} from './token-calculator/token-calculator';

@Component({
  selector: 'app-root',
  imports: [
    Header,
    TokenCalculator
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
}

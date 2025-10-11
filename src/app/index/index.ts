import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../common/components/header/header';

@Component({
  selector: 'app-index',
  imports: [
    RouterOutlet,
    Header,
  ],
  templateUrl: './index.html',
  styleUrl: './index.css'
})
export class Index {}

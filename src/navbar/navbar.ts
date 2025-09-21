import { Component, signal,Input } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  @Input()user:string="";
  protected readonly name = signal('Prashant');
}

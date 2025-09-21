import { Component, signal } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { Blocks } from '../blocks/blocks';
import { GamePanel } from '../game-panel/game-panel';

@Component({
  selector: 'app-root',
  imports: [Navbar, Blocks, GamePanel],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly name = signal('Prashant Kumar');
  gameSelection:boolean=true;
  runGame:string="";
  loadGame(gameName:string){
    this.gameSelection=false;
    this.runGame=gameName;
  }
  selectionStart(){
    this.gameSelection=true;
    this.runGame="";
  }
}

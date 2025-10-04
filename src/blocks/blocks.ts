import { Component,Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-blocks',
  imports: [],
  templateUrl: './blocks.html',
  styleUrl: './blocks.css'
})
export class Blocks {
  @Output() selectedGame = new EventEmitter();
  gameList=[{
    name:"Ballon Shooter",
    thumb:"./BallonShooter/BallonThumbnail.png"
  },{
    name:"Puzzle",
    thumb:"./Puzzle/PuzzleThumbnail.png"
  },{
    name:"Space Escape",
    thumb:"./SpaceEscape/SpaceThumnail.png"
  },{
    name:"Dog Runner",
    thumb:"./DogRunner/DogThumbnail.png"
  },{name:"Escape Pod",
    thumb:"./EscapePod/ShipThumbnail.png"
  }
  ]
  selectGame(gameName:string){
    this.selectedGame.emit(gameName);
  }
}

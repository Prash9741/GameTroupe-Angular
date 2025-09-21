import { Component, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Game as BallonShooter} from './BallonShooter/BallonShooter';
import { Game as DogRunner} from './DogRunner/DogRunner';
import { Game as SpaceEscape} from './SpaceEscape/SpaceEscape';
import { Game as Puzzle} from './Puzzle/Puzzle';
import { publish } from '../../node_modules/rxjs/dist/types/index';

@Component({
  selector: 'app-game-panel',
  imports: [],
  templateUrl: './game-panel.html',
  styleUrl: './game-panel.css'
})
export class GamePanel implements AfterViewInit {
  @Input() gameStart:string="";
  @ViewChild('canvas',{static:true}) canvasRef:any;
  ctx:any;
  Anime:any;
  ngAfterViewInit():void{
    let Canvas=this.canvasRef.nativeElement as HTMLCanvasElement;
    this.Anime=new Animation(Canvas,true);
    console.log(this.gameStart,"Running...");
    switch(this.gameStart){
      case "Ballon Shooter":
        this.Anime.start(BallonShooter);
        break;
      case "Puzzle":
        this.Anime.start(Puzzle);
        break;
      case "Space Escape":
        this.Anime.start(SpaceEscape);
        break;   
      case "Dog Runner":
        this.Anime.start(DogRunner);
        break;
      default:
        this.Anime.start(DogRunner); 
    }
  }
  ngOnDestroy():void{ //after componenet destroyed
    console.log(this.gameStart,"Destroyed");
    this.Anime.stopAnimation();
  }
}

export class Animation{
  canvas:any;sound:any;ctx:any;obj:any;
  animationId:any;
  constructor (canvas:any, sound=false){//pass the panel object and canvas Element
    this.canvas=canvas; 
    this.sound=sound; 
    this.ctx=this.canvas.getContext('2d');
    this.obj;
    window.onresize=()=>this.position();//change dimension here this. position(); this. animate();
    this.position();
    this.animate();
  }
  start(game:any){//call this function to show the object
    this.obj=new game(this.canvas,this.sound);
  }
  stopAnimation(){
    this.obj=null;
    cancelAnimationFrame(this.animationId);
  }
  position(){
    this.canvas.width=window.innerWidth-50;
    this.canvas.height=window.innerHeight-90;
    this.obj && this.obj.position(this.canvas.width,this.canvas.height);
  }
  animate(){
    this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    this.obj && this.obj.frame(this.ctx);//create frame function in object file
    this.animationId = requestAnimationFrame(this.animate.bind(this));
  }
}

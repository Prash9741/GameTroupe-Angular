import { Background } from "./Background";
import { Enemy } from "./Enemy";
import { Player } from "./Player";

const STATE={
  Loading:0,StartScreen:1,Running:2,Pause:3,GameOver:5
}

export class Game{
  state:number=0;
  frameCnt:number=0;
  width:number=0;
  height:number=0;
  size:number=1;dL:number=1;loadedImg:number;resourceCount:number;
  sound:any;control:any;canvas:any;
  developerMode:boolean=false;
  
  entities:any={};entitiesImg:any;entitiesSound:any;
  constructor (canvas:any, sound:any=0){
    this.canvas=canvas;
    this.sound=sound;
    this.position(canvas.width,canvas.height);
    this.loadedImg=0;
    this.entitiesImg={
      background:{
        self : "./SpaceEscape/background.png"
      },
      player:{
        self :"./SpaceEscape/player.png",
        sheild : "./SpaceEscape/sheild.png",
        gun : "./SpaceEscape/bat.png"
      },
      enemies:{
        self : "./SpaceEscape/Enemy.png",
        point : "./SpaceEscape/p2.png"
      },
    }

    this.resourceCount=0;  //convert Image url to image element
    for(let a in this.entitiesImg){
      this.resourceCount+=Object.keys(this.entitiesImg[a]).length;
      for(let b in this.entitiesImg[a]){
        let t=new Image();
        t.src=this.entitiesImg[a][b];
        this.entitiesImg[a][b]=t;
        this.entitiesImg[a][b].onload = ()=>this.loading(t);
      }
    }
  }
  loading(val:any){//if all images are loaded then run the game
    this.loadedImg++;
    if(this.loadedImg==this.resourceCount){
      console.log("Game file's loaded...",this.loadedImg);
      this.newGame();
    }
  }
  newGame():void {
    console.log("Game Begins");
    this.size=1;
    this.state=STATE.StartScreen;
    this.dL=1
    this.frameCnt=0;
    this.control=new Control(this,this.canvas);
    this.entities={//create a class with update, draw, and poisition function
      background: new Background(this),
      player: new Player(this),
      enemies: new Enemy(this)
    }
  }  
  frame (ctx:any){
    this.frameCnt++;
    if(this.state!=STATE.Loading){
      for(let a in this.entities){
        if(this.developerMode)
          this.entities[a].drawM(ctx);//call drawM for masking and draw for Images this.updation && this.entities[a].update();
        else 
          this.entities[a].draw(ctx);
        this.state==STATE.Running && this.entities[a].update();
      }
      if(this.state!=STATE.Running)
        this.alert(ctx);
    }
    else
      this.alert(ctx,);
  }
  position(w:number,h:number){
    this.width=w,this.height=h;
    this.size=w/1316;
    for(let a in this.entities)
      this.entities[a].position();
  }
  getScore(){
    return this.entities.player?this.entities.player.score:0;
  }
  getLife(){
    return this.entities.player?this.entities.player.life:0;
  }
  gameOver(score:number){
    this.state=STATE.GameOver;
    console.log("Game Over, Score: "+score);
  }
  getSec(){
    return Math.ceil(this.frameCnt*0.018);
  }
  alert(ctx:any){
    let text="";
    switch(this.state){
      case STATE.StartScreen:text="Press 'N' to start";break;
      case STATE.Pause:text="Pause";break;
      case STATE.GameOver:text="Game Over";break;
      case STATE.Loading:text="Ballon Shooter is Loading....";break;
    }
    ctx.fillStyle="Red";
    ctx.font=50*this.size+"px Arial";
    let x = ctx.measureText(text).width;
    ctx.fillText(text,this.width/2-x/2,this.height/2);
  }
}

class Control{//control input from here
  game:Game;
  mouse:any;
  position:any;
  constructor (game:Game, canvas:any) {
    this.game=game;
    this.mouse={x:0,y:0};
    this.position = canvas.getBoundingClientRect();
    window. addEventListener ("mousemove", e=>{
      this.mouse.x=e.x-this.position.left;
      this.mouse.y=e.y-this.position.top;
      });
    window. addEventListener ("keypress", (e)=>{ //Gaming Control
      if(e.code=="Space"){
        if(this.game.state==STATE.Running) //Pause and Play
          this.game.state=STATE.Pause;
        else if(this.game.state==STATE.Pause)
          this.game.state=STATE.Running;
      }
    });
    window. addEventListener ("mousedown", () =>{
      if(this.game.state==STATE.Running)
        this.game.entities.player && this.game.entities.player.gun.shoot();
    });
    window. addEventListener ("keydown", (e)=>{ // Cheat Code
      if(e.code=="KeyR" && e.shiftKey)
        this.game.entities.background && this.game.entities.background.reverse();
      else if(e.code=="KeyM" && e.shiftKey)
        this.game.developerMode=!this.game.developerMode;
      else if(e.code=="KeyN"){
        if(this.game.state==STATE.StartScreen)
          this.game.state=STATE.Running;
        else if(this.game.state==STATE.GameOver)
          this.game.newGame();
      }
    }) ;
  }
}


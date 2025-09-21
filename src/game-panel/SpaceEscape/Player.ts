import { Gun } from "./Gun";

export class Player{
    game:any;shot:any;blastSound:any;shield:any;sFp:any;
    x:number;y:number;size:number=0;life:number;score:number;rotate:number;
    img:any;gun:any;
    constructor(game:any){
        this.game=game;
        this.x=0;
        this.y=0;
        this.shot={x:0,y:0};
        this.gun=new Gun(this);
        this.life=5;
        this.score=0;
        this.rotate=0;
        this.shield={
          img : this.game.entitiesImg.player.sheild,
          fx: -1,
          maxX: 10,
          fSize : 300,
          state : 0,
          put : ()=>{
            this.shield.state=10;
            this.shield.fx=9;
          },
          size : 0,
        }
        this.img=this.game.entitiesImg.player.self;
        this.blastSound=new Audio()
        this.blastSound.volume = .4*this.game.sound;
        this.blastSound.src = './SpaceEscape/blast.mp3' ;
        this.sFp={
          x:0,
          y:Math.floor(Math.random()*4),
          maxX:8, maxY:1, sizeX:250, sizeY: 250
      }
      this.position();
    }
    update(){
      this.rotate-=.5;
      this.gun.update();
      if(this.shield.state && this.game.frameCnt%42==0){
        this.shield.state--;        
        this.shield.fx--;
      }
    }
    draw(ctx:any){
      ctx.save();
      ctx.translate(this.x,this.y);
      ctx.rotate(this.rotate*Math.PI/180);
      ctx.drawImage(this.img,-this.size,-this.size,this.size*2, this.size*2);
      if(this.shield.state){
        ctx.drawImage(this.shield.img,this.shield.fx*this.shield.fSize,0,this.shield.fSize,this.shield.fSize,
          -this.shield.size,-this.shield.size,this.shield.size*2,this.shield.size*2);
      }
      ctx.restore();
      if(this.shield.state)
        this.printLife(ctx,"Sheild Activate");
      this.gun.draw(ctx);
    }
    drawM(ctx:any){
      ctx.beginPath();
      ctx.strokeStyle="Green";
      ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
      if(this.shield.state)
        ctx.arc(this.x,this.y,this.shield.size,0,Math.PI*2);
      ctx.stroke();
      this.gun.drawM(ctx);
    }
    position(){
      this.size=70*this.game.size;
      this.x=this.game.width/2;
      this.y=this.game.height/2;
      this.shield.size=this.size * 1.2;
      this.gun.position();
    }
    point(){
      this.score++;
      if(Math.random()<0.07)
        this.shield.put();
    }
    knock(){
      if(this.shield.state) //protected
        return;
      this.blastSound.play();
      if(this.life)
        this.life--;
      else
        this.game.gameOver(this.score);
    }
    printLife(ctx:any ,text:string){
      let margin=5*this.game.size;
      this.setFontDefination(ctx,"SkyBlue","Arial",60);
      let x =ctx.measureText(text).width;
      ctx.globalAlpha=.5;
      ctx.fillText(text,this.game.width/2-x/2,this.game.height/3);
      ctx.globalAlpha=1;
    }
    setFontDefination(ctx:any,color:string,font:string,size:number){
        ctx.fillStyle=color;
        ctx.font=size*this.game.size+"px "+ font;
    }
  }
  
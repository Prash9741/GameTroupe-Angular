import { Gun } from "./Gun";

export class Player{
    game:any;shot:any;
    x:number;y:number;size:number=0;life:number;score:number;rotate:number;
    img:any;show:number;gun:any;
    constructor(game:any){
        this.game=game;
        this.x=0;
        this.y=0;
        this.shot={x:0,y:0};
        this.gun=new Gun(this);
        this.life=5;
        this.score=0;
        this.rotate=0;
        this.show=0;
        this.img=this.game.entitiesImg.player.self;
        this.position();
    }
    update(){
      this.rotate-=5;
      this.gun.update();
      if(this.show)
        this.show--;
    }
    draw(ctx:any){
        if(this.show%10==0){
          ctx.save();
          ctx.translate(this.x,this.y);
          ctx.rotate(this.rotate*Math.PI/180);
          ctx.drawImage(this.img,-this.size,-this.size,this.size*2, this.size*2);
          ctx.restore();
        }
        this.gun.draw(ctx);
    }
    drawM(ctx:any){
      ctx.beginPath();
      ctx.strokeStyle="Green";
      ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
      ctx.stroke();
      this.gun.drawM(ctx);
    }
    position(){
      this.size=40*this.game.size;
      this.x=this.game.width/2;
      this.y=this.game.height-this.size*1.5;
    }
    knock(){
      this.show=30;
      if(this.life)
        this.life--;
      else
        this.game.gameOver(this.score);
    }
  }
  
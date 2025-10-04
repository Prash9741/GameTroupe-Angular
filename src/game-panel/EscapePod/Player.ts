export class Player{
    game:any;shot:any;
    x:number;y:number;height:number=0;width:number=0;life:number;score:number;rotate:number;
    img:any;show:number;gun:any;
    constructor(game:any){
        this.game=game;
        this.x=200;
        this.y=200;
        this.shot={x:0,y:0};
        // this.gun=new Gun(this);
        this.life=50;
        this.score=0;
        this.rotate=0;
        this.show=0;
        this.img=this.game.entitiesImg.player.self;
        this.position();
    }
    update(){
      this.rotate-=5;
      // this.gun.update();
      if(this.show)
        this.show--;
      this.x=this.game.control.mouse.x;
      this.y=this.game.control.mouse.y;
      this.collision();//testing line
      }
      draw(ctx:any){
        ctx.drawImage(this.img,this.x-this.width,this.y-this.height,this.width*2, this.height*2);
      }
    drawM(ctx:any){
      ctx.beginPath();
      ctx.strokeStyle="Green";
      ctx.ellipse(this.x,this.y,this.width,this.height,0,0,Math.PI*2);
      ctx.stroke();
      
      // this.gun.drawM(ctx);
    }
    position(){
      this.width=30*this.game.size;
      this.height=this.width*1.8;
      this.x=this.game.control.mouse.x;
      this.y=this.game.control.mouse.y;
    }
    knock(){
      this.show=30;
      if(this.life)
        this.life--;
      else
        this.game.gameOver(this.score);
    }
    collision(){
      for(let e of this.game.entities.enemies.enemyArr){
        let p=this.game.entities.player;

        let disX=p.x-e.x;
        let disY=p.y-e.y;
        let angle=Math.atan2(disX,disY);      
        
        let a=p.width*Math.cos(angle);
        let b=p.height*Math.sin(angle);
        let ellipseDis=(p.width*p.height)/Math.sqrt(a*a+b*b);

        let px=this.x-ellipseDis*Math.sin(angle); 
        let py=this.y-ellipseDis*Math.sin((Math.PI/2)-angle);

        let totalDis=Math.sqrt(disX*disX+disY*disY);
        if(totalDis-ellipseDis-e.size<0){
          e.explode();
          this.knock();
        }
      }
  }
}
  
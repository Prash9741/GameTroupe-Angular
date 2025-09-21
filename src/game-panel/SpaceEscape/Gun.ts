export class Gun{
    player:any;speed:number;x:number;y:number;barrel:number;angle:number;size:number;
    bulletArr:any;shooting:boolean;img:any;
    constructor(player:any){
      this.player=player;
      this.speed=25; 
      this.barrel=this.player;
      this.x=0; 
      this.y=0; 
      this.bulletArr=[];
      this.img=this.player.game.entitiesImg.player.gun;
      this.shooting=false;
      this.angle=0;
      this.size=0;
    }
    update(){
      for(let a of this. bulletArr)
        a.update();
      this.angle=Math.atan2(this.player.x-this.player.game.control.mouse.x,this.player.y-this.player.game.control.mouse.y);
      this.x=this.player.x-this.player.size*1.2*Math.sin(this.angle); 
      this.y=this.player.y-this.player.size*1.2*Math.sin((Math.PI/2)-this.angle);
      this.bulletArr=this.bulletArr.filter((a:any)=>a.life);
    }
    draw(ctx:any) {
      ctx.save();
      ctx.translate(this.x,this.y);
      ctx.rotate(-this.angle);
      ctx.drawImage(this.img,-this.size/2,-this.size/4,this.size,this.size/2);

      ctx.restore();

      for(let a of this.bulletArr)
        a.draw(ctx) ;
    }
    drawM(ctx:any){
      ctx.beginPath();
      ctx.strokeStyle="blue";
      ctx.arc(this.x,this.y,this.player.size*.2,0,Math.PI*2);
      ctx.stroke();
      for (let a of this. bulletArr)
        a.drawM(ctx) ;
    }
    position(){
      this.x=this.player.x;
      this.y=this.player.y;
      this.size=60*this.player.game.size;
    }
    shoot(){
      this.bulletArr.push(new Bullet(this));
    }
  }

  export class Bullet{
    gun:any;size:number;x:number;y:number;
    endX:number;endY:number;disY:number;disX:number;
    life:boolean;
    constructor(gun:any){
      this.gun=gun;
      this.size=this.gun.player.size*.25;
      this.x=this.gun.x;
      this.y=this.gun.y;
      this.endX=this.gun.player.x;
      this.endY=this.gun.player.y; 
      this.disX=(this.x-this.endX)/3;
      this.disY=(this.y-this.endY)/3; 
      this.life=true;
    }
    update(){
      this.x+=this.disX;
      this.y+=this.disY;
      if(this.x<-this.size || this.x>this.gun.player.game.width+this.size ||
        this. y<-this.size || this.y>this.gun.player.game.height+this.size)
        this. life=false;
      this.collision();
      }
    draw(ctx:any){
      this.drawM(ctx);
    }
    drawM(ctx:any){
      ctx.beginPath();
      ctx.fillStyle="red";
      ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
      ctx.fill();
    }

    collision(){
      if(this.gun.player.game.entities.enemies)
        for(let e of this.gun.player.game.entities.enemies.enemyArr)
          if(!e.explosion){
            let dX=this.x-e.x;
            let dY=this.y-e.y;
            let rad=this.size+e.size;
            if(dX*dX+dY*dY<rad*rad){
              e.explode() ;
              this.gun.player.point();
            }
          }
    }
   }
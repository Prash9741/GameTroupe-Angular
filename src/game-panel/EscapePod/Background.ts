import { min } from "rxjs";

export class Background{
    game:any;shot:any;
    x:number;y:number;size:number=0;speed:number;minSpeed:number;width:number=0;height:number=0;quantity:number=1;
    image:any;dir
    :boolean;
    constructor(game:any){
        this.game=game;
        this.image=this.game.entitiesImg.background.self;
        this.x=0;
        this.y=0;
        this.speed=3;
        this.minSpeed=5;
        this.dir=true;
        this.position();
    }
    update(){
      if(this.dir){
        this.y+=this.speed;
        if(this.y>Math.min(this.image.height,this.height))
            this.y=0;
      }
      else{
        this.y-=this.speed;
        if(this.y<-this.image.height)
            this.y=0;
      }
    }
    draw(ctx:any){
        console.log(this.quantity);
        for(let i=-1;i<=this.quantity;i++)
            ctx.drawImage(this.image,this.x,this.y+this.height*i,this.image.height,this.game.width);
        this.baseLine(ctx);
    }
    drawM(ctx:any){
        this.baseLine(ctx);
    }
    baseLine(ctx:any){
        ctx.beginPath();
        ctx.strokeStyle="white";
        ctx.moveTo(0,this.game.width-this.game.size*30);
        ctx.lineTo(this.game.height,this.game.width-this.game.size*30);
        ctx.stroke();

        let margin=5*this.game.size;

        this.printScore(ctx,"Score : "+this.game.getScore());
        this.printLife(ctx,"Life: "+this.game.entities.player.life);
    }
    printScore(ctx:any ,text:string){
        let margin=5*this.game.size;
        this.setFontDefination(ctx,"white","Times New Roman",30);
        ctx.fillText(text,margin,this.game.width-margin);
    }
    printLife(ctx:any ,text:string){
        let margin=5*this.game.size;
        this.setFontDefination(ctx,"white","Arial",30);
        let x =ctx.measureText(text).height;
        ctx.fillText(text,this.game.height-x-margin,this.game.width-margin);
    }
    position(){
        this.height=this.game.height;
        this.width=this.game.width;
        this.quantity=Math.ceil((this.height/this.image.height));
    }
    reverse(){
        this.dir=!this.dir;
    }
    setFontDefination(ctx:any,color:string,font:string,size:number){
        ctx.fillStyle=color;
        ctx.font=size*this.game.size+"px "+ font;
    }
  }
  
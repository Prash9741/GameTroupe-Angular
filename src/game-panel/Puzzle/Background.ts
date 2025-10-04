export class Background{
    game:any;shot:any;
    x:number;y:number;size:number=0;speed:number;minSpeed:number;height:number=0;width:number=0;quantity:number=1;
    image:any;dir
    :boolean;
    constructor(game:any){
        this.game=game;
        this.image=this.game.entitiesImg.background.self;
        this.x=0;
        this.y=0;
        this.speed=.2;
        this.minSpeed=5;
        this.dir=false;
        this.position();
    }
    update(){
      if(this.dir){
        this.x+=this.speed;
        if(this.x>this.image.width)
            this.x=0;
      }
      else{
        this.x-=this.speed;
        if(this.x<-this.image.width)
            this.x=0
      }
    }
    draw(ctx:any){
        for(let i=-1;i<=this.quantity;i++)
            ctx.drawImage(this.image,this.x+this.image.width*i,this.y,this.image.width,this.game.height);
        this.baseLine(ctx);
    }
    drawM(ctx:any){
        this.baseLine(ctx);
    }
    baseLine(ctx:any){
        ctx.beginPath();
        ctx.strokeStyle="Black";
        ctx.moveTo(0,this.game.height-this.game.size*30);
        ctx.lineTo(this.game.width,this.game.height-this.game.size*30);
        ctx.stroke();

        let margin=5*this.game.size;

        this.printScore(ctx,"Time : "+this.game.getSec());
        this.printLife(ctx,"Moves: "+this.game.entities.playArea.move);
    }
    printScore(ctx:any ,text:string){
        let margin=5*this.game.size;
        this.setFontDefination(ctx,"black","Times New Roman",30);
        ctx.fillText(text,margin,this.game.height-margin);
    }
    printLife(ctx:any ,text:string){
        let margin=5*this.game.size;
        this.setFontDefination(ctx,"Black","Arial",30);
        let x =ctx.measureText(text).width;
        ctx.fillText(text,this.game.width-x-margin,this.game.height-margin);
    }
    position(){
        this.width=this.game.width;
        this.height=this.game.height;
        this.quantity=Math.ceil((this.width/this.image.width));
    }
    reverse(){
        this.dir=!this.dir;
    }
    setFontDefination(ctx:any,color:string,font:string,size:number){
        ctx.fillStyle=color;
        ctx.font=size*this.game.size+"px "+ font;
    }
  }
  
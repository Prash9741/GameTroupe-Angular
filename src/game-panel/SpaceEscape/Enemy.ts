export class Enemy{
    size:any;img:any;speed:any;game:any;
    x:number;y:number;density:number;enemyArr:any;
    constructor (game:any) {
        this.game=game;
        this.size=[30,20];//30-50
        this.speed=[60,20];//40-60 
        this.density=90; this.enemyArr=[];
        this.x=0; 
        this.y=0;
        this.img=this.game.entitiesImg.enemies.self;
        this.position();
    }
    position(){
        this.y=this.game.height;
    }
    update(){
        if(this.game.frameCnt%Math.ceil(this.density/this.game.dL)==0)
            this.makeEnemy();
        if(this.game.frameCnt%600==0)
            this.game.dL++;
        for(let a of this.enemyArr)
            a. update() ;
        this.enemyArr=this.enemyArr.filter((a:any)=>a.life);
    }
    draw(ctx:any){
        for(let a of this.enemyArr)
            a. draw(ctx) ;
    }

    drawM(ctx:any) {
        for(let a of this. enemyArr)
            a.drawM(ctx);
    }

    killAll(){
        for(let e of this.enemyArr)
            e. explode();
    }
    makeEnemy(){
        let vertical=Math.random()>0.5;
        let x, y;
        if(vertical){
            x=this.game.width*Math.random();
            y=Math.random()>0.5?this.game.height:0;
        }
        else{
            x=Math.random()>0.5?this.game.width:0;
            y=this.game.height*Math.random();
        }
        this.enemyArr.push(new Ballon(this,x,y));
    }
}

class Ballon{
    e:Enemy;
    disX:number;disY:number;
    x:number;y:number;size:number;speed:number;shake:number;
    life:boolean;explosion:boolean
    fp:any;color:any;popSound:any;
    constructor (e:Enemy,x:number,y:number){
        this.e=e;
        this.size=(e.size[0]+Math.random()*e.size[1])*this.e.game.size;
        this.speed=e.speed[0]+Math.random()*e.speed [1];
        this.x=x
        this.y=y
        this.life=true; 
        this.explosion=false;
        this.fp={
            x:0,
            y:0,
            maxX:8, maxY:1, sizeX:250, sizeY: 250
        }
        this.shake=Math.floor(Math.random()*3+1);
        this.color=["Blue", "Green", "Red", "Yellow"];
        
        this.disX=(this.x-this.e.game.entities.player.x)/this.speed;
        this.disY=(this.y-this.e.game.entities.player.y)/this.speed; 
    };
    
    die(){
        this.life=false;
    }
    update(){
        this.y-=this.disY;
        this.x-=this.disX;
        if(this.explosion){
            if(this.e.game.frameCnt%3==0)
                this.fp.x++;
            if(this.fp.x==this.fp.maxX)
                this.die();
        }
        else if(this.y<-this.size){
            this.die();
            this.e.game.entities.player && this.e.game.entities.player.knock();
        }
        this.collision();
    }
    draw(ctx:any) {
        let size=this.size*this.e.game.size*3;
        ctx.drawImage(this.e.img,this.fp.x*this.fp.sizeX,this.fp.y*this.fp.sizeY,this.fp.sizeX,this.fp.sizeY,
                      this.x-size/2,this.y-size/2, size,size);
    }
    drawM(ctx:any){
        let size=this.size*this.e.game.size;
        ctx.beginPath();
        ctx.strokeStyle=this.color[this.fp.y];
        ctx.fillStyle=this.color[this.fp.y];
        ctx.arc(this.x,this.y,size,0,Math.PI*2);
        if(this.explosion)
            ctx.stroke();
        else
            ctx.fill();
    }
    explode(){
        this.explosion=true;
    }
    collision(){
        if(this.e.game.entities.player && !this.explosion){
            let dX=this.x-this.e.game.entities.player.x;
            let dY=this.y-this.e.game.entities.player.y;
            if(Math.sqrt(dX*dX+dY*dY)<this.size+this.e.game.entities.player.size){
                this.explode() ;
                this.e.game.entities.player.knock();
            }
        }
    }
}
export class Enemy{
    size:any;img:any;speed:any;game:any;
    x:number;y:number;density:number;enemyArr:any;
    constructor (game:any) {
        this.game=game;
        this.size=[20,20];//30-50
        this.speed=12;//1-6 
        this.density=70; this.enemyArr=[];
        this.x=0; 
        this.y=0;
        this.img=this.game.entitiesImg.enemies.self;
        this.position();
    }
    position(){
        this.y=this.game.height;
    }
    update(){
        if(this.game.frameCnt%Math.floor((Math.random()*this.density+this.density)/this.game.dL)==0)
            this.makeEnemy();
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
        this.enemyArr.push(new Ballon(this));
    }
}

class Ballon{
    e:Enemy;
    x:number;y:number;size:number;shake:number;
    life:boolean;explosion:boolean
    fp:any;color:any;popSound:any;
    constructor (e:Enemy){
        this.e=e;
        this.size=e.size[0]+Math.random()*e.size[1];
        this.x=this.e.game.width;
        this.y=this.e.game.height-this.e.game.base;
        this.life=true; 
        this.explosion=false;
        this. fp={
            x:0,
            y:Math.floor(Math.random ()*4),
            maxX: 6, maxY:4, sizeX:100, sizeY: 100
        }
        this.shake=1;
        this.color=["Blue", "Green", "Red", "Yellow"];
        this.popSound=new Audio()
        this.popSound.volume = .2*this.e.game.sound;
        this.popSound.src = './DogRunner/bark.mp3' ;
    } ;
    
    die(){
        this.life=false;
    }
    update(){
        this.x-=this.e.speed;
        if(this.explosion){
            if(this.e.game.frameCnt%5==0)
                this.fp.x++;
            if(this.fp.x==this.fp.maxX)
                this.die();
        }
        else{
            if(this.x<-this.size){
                this.die();
                this.e.game.entities.player && this.e.game.entities.player.point();
            }
        }
        this.collision();
    }
    draw(ctx:any) {
        let size=this.size*this.e.game.size*3;
        ctx.beginPath();
        ctx.moveTo(this.x,this.y+size/3)
        ctx.lineTo(this.x,this.y+size);
        ctx.stroke();
        ctx.drawImage(this.e.img,this.fp.x*this.fp.sizeX,this.fp.y*this.fp.sizeY,this.fp.sizeX,this.fp.sizeY,
                      this.x-size/2,this.y-size/2, size,size);
    }
    drawM(ctx:any){
        let size=this.size*this.e.game.size;
        ctx.beginPath();
        ctx.strokeStyle=this.color[this.fp.y];
        ctx.fillStyle=this.color[this.fp.y];
        ctx.arc(this.x,this.y,size,Math.PI,Math.PI*2);
        if(this.explosion)
            ctx.stroke();
        else
            ctx.fill();
    }
    explode(){
        this.popSound.play();
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
export class Enemy{
    size:any;img:any;speed:any;game:any;
    x:number;y:number;density:number;enemyArr:any;
    constructor (game:any) {
        this.game=game;
        this.size=[30,20];//30-50
        this.speed=[1,5];//1-6 
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
        if(this.game.frameCnt%Math.floor(this.density/this.game.dL)==0)
            this.makeEnemy();
        if(this.game.frameCnt%2000==0){
            console.log(this.game.dL);
            this.game.dL++;
        }
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
    x:number;y:number;size:number;speed:number;shake:number;
    life:boolean;explosion:boolean
    fp:any;color:any;popSound:any;
    constructor (e:Enemy){
        this.e=e;
        this.size=e.size[0]+Math.random()*e.size[1];
        this.speed=e.speed[0]+Math.random()*e.speed [1];
        this.x=(this.e.game.width-this.size*6)*Math.random()+this.size*3;
        this.y=-this.size;
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
        this.popSound.src = './BallonShooter/pop.mp3' ;
    } ;
    
    die(){
        this.life=false;
    }
    update(){
        this.y+=this. speed;
        if(this.explosion){
            if(this.e.game.frameCnt%5==0)
            this.fp.x++;
            if(this.fp.x==this.fp.maxX)
                this.die();
        }
        else{
            this.x+=this.shake*Math.sin(this.y*Math.PI/180);
            if(this.y>this.e.game.height+this.size){
                this.die();
                this.e.game.entities.player && this.e.game.entities.player.knock();
            }
        }
        // this.collision();
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
        ctx.arc(this.x,this.y,size,0,Math.PI*2);
        if(this.explosion)
            ctx.stroke();
        else
            ctx.fill();
    }
    explode(){
        // this.popSound.play();
        this.explosion=true;
    }
    collision(){
        let p=this.e.game.entities.player;
        let disX=p.x-this.x;
        let disY=p.y-this.y;
        let angle=Math.atan2(disX,disY);
        let a=p.width*Math.sin(angle);
        let b=p.height*Math.cos(angle);
        let ellipseDis=(p.width*p.height)/Math.sqrt(a*a+b*b);

        let totalDis=Math.sqrt(disX*disX+disY*disY);
        if(totalDis-ellipseDis-this.size<0)
            console.log("collied");
    }
}
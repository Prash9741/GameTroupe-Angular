
export class Player{
    game:any;jumpHeight:number;life=0;
    score:number=0;
    img:any;imgFrameSize:any;f:any;//dog Animation
    x:number;y:number;size:number=0;//cordinates
    margin:number=0;  state:any ;currentState:string;//base from the bottom
    weight:number;vy:number;
    constructor(game:any){
      this.game=game;
      this.x=0;
      this.y=0;
      this.img=this.game.entitiesImg.player.self;
      this.imgFrameSize={w:100,h:91.3}
      this.jumpHeight=18;
      this.life=5;
      this.weight=1;
      this.vy=0
      this.state={
        "Running":{
          x:0,
          y:3,
          maxX:9,
        },
        "Jumping":{
          x:0,
          y:1,
          maxX:7,
        },
        "Falling":{
          x:0,
          y:2,
          maxX:7,
        },
      }
      this.currentState="Running";
      this.position();
    }
    update(){
      if(this.game.frameCnt%2==0)
        this.state[this.currentState].x=(++this.state[this.currentState].x)%this.state[this.currentState].maxX;

      this.y+=this.vy;//jump start

      if(!this.onGround()){
        this.vy+=this.weight;
        if (this.vy > this.weight) 
          this.currentState="Falling";
      }
      else{
        this.currentState="Running";
        this.vy=0;
        this.y=this.game.height-this.size-this.margin;
      }

    }
    draw(ctx:any){
        ctx.drawImage(this.img,(this.state[this.currentState].x*this.imgFrameSize.w),(this.state[this.currentState].y*this.imgFrameSize.h),this.imgFrameSize.w,this.imgFrameSize.h,
                    this.x-this.size,this.y-this.size,this.size*2,this.size*2);
    }
    drawM(ctx:any){
      ctx.beginPath();
      ctx.strokeStyle="red";
      ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
      ctx.stroke();
    }
    jump(){
      if(this.currentState=="Running"){
        this.currentState="Jumping";
        this.vy -= this.jumpHeight;
      }
    }
    point(){
      this.score++;
    }
    onGround() {
      return this.y>=this.game.height-this.size-this.margin;
    }
    knock(){
      if(this.life)
        this.life--;
      else 
        this.game.gameOver();
    }
    position(){
      this.size=this.game.size*50;
      this.margin=30*this.game.size;
      this.x=this.game.size*150;
      this.y=this.game.height-this.size-this.margin;
    }
  }

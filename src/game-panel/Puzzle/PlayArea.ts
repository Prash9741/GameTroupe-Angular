export class PlayArea{
    game:any;
    img:any;piece:any//dog Animation
    x:number;y:number;width:number=0;height:number=0;//cordinates
    vPiece:number;hPiece:number;iWFrame:number=0;iHFrame:number=0;wFrame:number=0;hFrame:number=0;
    move:number;
    margin:number=0;select:number  //base from the bottom
    constructor(game:any){
      this.game=game;
      this.x=0;
      this.y=0;
      this.move=0;
      this.img=this.game.entitiesImg.playArea.self;
      this.vPiece = 3;
      this.hPiece =3;
      this.select = this.vPiece*this.hPiece-1;
      this.position();

      this.piece=[];
      for(let i=0;i<this.vPiece;i++){
        for(let j=0;j<this.hPiece;j++){
          this.piece.push(new Piece(this,i,j));
        }
      }
      this.piece[this.select].imgData.visible=false;
    }
    shuffle(){
      for(let i=0;i<1000;i++){
        let i=Math.floor(Math.random()*this.vPiece);
        let j=Math.floor(Math.random()*this.hPiece);
        if(this.validMoves(i,j))
          this.swap(i*this.vPiece+j,this.select);
        }
    }
    validMoves(i:number,j:number) {
      let sI=Math.floor(this.select/this.vPiece);
      let sJ=this.select%this.vPiece;
      return (i==sI && Math.abs(j-sJ)==1 || j==sJ && Math.abs(i-sI)==1 );
    }
    clickedPiece(){
      let shiftX=this.x-this.width/2;//to shift the screen
      let shiftY=this.y-this.height/2;
      if(shiftX < this.game.control.mouse.x && shiftX+this.width > this.game.control.mouse.x  &&
        shiftY < this.game.control.mouse.y && shiftY+this.height > this.game.control.mouse.y) {
          let i=Math.floor((this.game.control.mouse.x-shiftX)/this.wFrame);
          let j=Math.floor((this.game.control.mouse.y-shiftY)/this.hFrame);
          if(this.validMoves(i,j)){
            this.swap(i*this.vPiece+j,this.select);
            this.move++;
          }
        }
    }
    swap(a:number,b:number){
      [this.piece[a].imgData, this.piece[b].imgData] = [this.piece[b].imgData, this.piece[a].imgData];
      this.select=a;
    }
    update(){

      // if(this.game.frameCnt%2==0)
      //   this.f.x=(++this.f.x)%this.f.maxX;
      for(let i=0;i<this.piece.length;i++)
        if(!(this.piece[i].i==this.piece[i].imgData.I && this.piece[i].j== this.piece[i].imgData.J))
          return ;
        
      this.piece[this.select].imgData.visible=true;
      this.game.gameOver();
    }
    draw(ctx:any){
        ctx.fillRect(this.x-this.width/2,this.y-this.height/2,this.width,this.height);
        for(let i=0;i<this.piece.length;i++)
          this.piece[i].draw(ctx);
    }
    position(){
      this.x=this.game.width/2;
      this.y=this.game.height/2
      this.width=this.game.size*this.game.height*.80;
      this.height=this.game.size*this.game.height*.80;
      this.iWFrame = this.img.width / this.hPiece;//width of image piece
      this.iHFrame = this.img.height / this.vPiece;//height of image piece
      this.wFrame = this.width / this.hPiece; //width size of image
      this.hFrame = this.height / this.vPiece;//height size of image
      // this.margin=this.height*.2;
      // this.y=this.game.height-this.height-this.margin;
    }
  }

  
class Piece{
  e:any;
  i:number;j:number;
  imgData:any;placed:boolean;
  width:number=0;height:number=0;//cordinates
  // vPiece:number;hPiece:number;iWFrame:number;iHFrame:number;wFrame:number;hFrame:number;
  // size:number;
  constructor(e:any,i:number,j:number){
    this.e=e;
    this.i=i;
    this.j=j;
    this.imgData={
      I:i,
      J:j,
      visible:true
    }
    this.placed=false;
  }
  update(){
    if(this.i==this.imgData.I && this.j== this.imgData.J)
      this.placed=true;
    // this.iWFrame = this.img.width / this.hPiece;//width of image piece
    // this.iHFrame = this.img.height / this.vPiece;//height of image piece
    // this.wFrame = this.width / this.hPiece; //width size of image
    // this.hFrame = this.height / this.vPiece;//height size of image
  }
  draw(ctx:any){
    if(!this.imgData.visible)
      return;
    // console.log(this.x,this.y);
    // ctx.save();
    // ctx.translate(,);
    let x=this.e.x-this.e.width/2;//to shift the screen
    let y=this.e.y-this.e.height/2;
    ctx.drawImage(this.e.img,  this.imgData.I*this.e.iWFrame,this.imgData.J*this.e.iHFrame,this.e.iWFrame,this.e.iHFrame,
                  (x+this.i*this.e.wFrame), (y+this.j*this.e.hFrame), this.e.wFrame,this.e.hFrame);

    // ctx.restore();
  }
  position(){

  }
}
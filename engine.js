class Engine{
  constructor(canvas){
    this.canvas = canvas;
    this.width = canvas.width
    this.height = canvas.height
    this.ctx = this.canvas.getContext("2d");
  }
  drawRect(color = "Black", startArr = [0, 0], sizeArr = [this.width, this.height]){
    this.ctx.fillStyle = color
    this.ctx.fillRect(startArr[0], startArr[1], sizeArr[0], sizeArr[1]);
  }
  drawRectWall(...args){
    this.drawRect(...args);
  }
  drawLine(startArr, endArr, color, size){
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = size;
    this.ctx.beginPath();
    this.ctx.moveTo(...startArr);
    this.ctx.lineTo(...endArr);
    this.ctx.stroke();
  }
}
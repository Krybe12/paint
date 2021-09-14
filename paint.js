class Paint{
  constructor(engine){
    this.engine = engine;
    this.paint = false;
    this.size = 5;
    this.color = 'rgb(0, 0, 0)';
    this.lastLoc = []
  }
  changeBucket(){
    this.bucket ? this.bucket = false : this.bucket = true;
  }
  mouseDown(x, y){
    if (this.bucket) {
      this.data = this.getData();
      this.replaceColor(x,y, this.getPixelColor(x, y));
      return;
    }
    this.paint = true;
    this.lastLoc = [x, y];
    this.paintPoint(x, y);
  }
  mouseUp(){
    this.paint = false;
  }
  mouseMove(x, y){
    if (!this.paint) return;
    this.paintPoint(x, y);
    this.paintLine(this.lastLoc, [x, y]);
    this.lastLoc = [x, y];
  }
  replaceColor(x, y, color){
    if (this.getPixelColor(x,y).toString() == color.toString()){
      this.engine.drawRect(this.color.toString(), [x, y], [1, 1]);
      console.log("drawing at", x, y)
    } else {
      console.log("not le same clr")
      return;
    }
    if (x > this.engine.width || x <= 0 || y > this.engine.height || y <= 0){
      console.log("returning")
      return;
    }
    this.replaceColor(x + 1, y, color);
    //this.replaceColor(x - 1, y, color);
    this.replaceColor(x, y + 1, color);
    //this.replaceColor(x, y - 1, color);
  }
  paintPoint(x, y){
    this.engine.drawRect(this.color, [x - this.size / 2, y - this.size / 2], [this.size, this.size])
  }
  paintLine(startArr, endArr){
    this.engine.drawLine(startArr, endArr, this.color, this.size)
  }
  clear(){
    this.engine.drawRect('White')
  }
  getData(){
    return [...this.engine.ctx.getImageData(0, 0, this.engine.width, this.engine.height).data];
  }
  getPixelColor(x, y){
    let index = (x + y * this.engine.height) * 4;
    return [this.data[index], this.data[index + 1], this.data[index + 2]]
  }
  saveData(data){
    let imgData = new ImageData(this.engine.width, this.engine.height);
    imgData.data.set(data)
    console.log(imgData)
    this.engine.ctx.putImageData(imgData, 0, 0)
  }
}
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})` : null;
}
let paint = new Paint(new Engine(document.getElementById('canvas')))
paint.clear()
paint.engine.canvas.addEventListener('mousedown', e => paint.mouseDown(e.offsetX, e.offsetY))
paint.engine.canvas.addEventListener('mouseup', e => paint.mouseUp())
paint.engine.canvas.addEventListener('mousemove', e => paint.mouseMove(e.offsetX, e.offsetY))

/* 

setInterval(function(){
  let x = new FormData;
  x.append('et_pb_contact_email_0', 'kokot@kokot.cz');
  x.append('et_pb_contact_name_0', 'bůh');
  x.append('et_pb_contact_telefon_0', 123456789);
  x.append('et_pb_contact_spolecnost_0', 'EducaGang');
  x.append('et_pb_contact_message_0', 'ahoj marťo');
  
  fetch('', {
    method: 'post',
    body: x
  }).then(function(response) {
    return response.text();
  }).then(function(data) {
    
  });
},300) */


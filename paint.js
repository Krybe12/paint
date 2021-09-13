class Paint{
  constructor(engine){
    this.engine = engine;
    this.paint = false;
    this.size = 5;
    this.color = 'Black';
    this.lastLoc = []
  }
  mouseDown(x, y){
    if (this.bucket) {
      this.replaceColor(x,y, this.getClickedColor(x, y));
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
  replaceColor(x, y, color){
    let arr = this.getZone(x, y, color)

    /*     for (let i = 0; i < 20000; i+=4) {
      [this.data[i], this.data[i + 1], this.data[i + 2]] = [0, 0, 0];
    } */
  }
  getZone(x, y, color){
    console.log(color)
    let index = (x + y * this.engine.height) * 4;
    if (this.data[index] == color[0] && this.data[index + 1] == color[1] && this.data[index + 2] == color[2]){
      return [this.getZone(x, y + 1)];
    }
    return;
  }
  getClickedColor(x, y){
    this.data = this.getData();
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


class Paint{
  constructor(engine){
    this.engine = engine;
    this.paint = false;
    this.size = 5;
    this.color = 'rgb(0, 0, 0)';
    this.lastLoc = [];
  }
  changeBucket(){
    this.bucket ? this.bucket = false : this.bucket = true;
  }

  floodFill(x, y){
    if(this.getPixelColor(x, y).toString() == this.bg){
      this.engine.drawRect(this.color, [x - 2, y - 2], [7, 7]);
      this.floodFill(x, y - 5);
      this.floodFill(x, y + 5);
      this.floodFill(x - 5, y);
      this.floodFill(x + 5, y);
    }
  }

  mouseDown(x, y){
    if (this.bucket) {
      this.bg = this.getPixelColor(x, y).toString()
      this.floodFill(x, y);
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
    let p1 = this.checkSideFromPoint(x, y, color, "LEFT");
    let p2 = this.checkSideFromPoint(x, y, color, "RIGHT");
    //this.engine.drawLine(p1, p2, this.color, 1)
    let i = p1[0];
    while(i++ < p2[0]){
      let k = this.checkSideFromPoint(i, y, color, "UP");
      let k2 = this.checkSideFromPoint(i, y, color, "DOWN");
      this.engine.drawLine(k2, k, this.color, 1)
    }
  }
  checkSideFromPoint(x, y, color, side){
    let p2 = [];
    while (this.getPixelColor(x,y).toString() == color.toString()) {
      if (x > this.engine.width || x < 0 || y > this.engine.height || y < 0) break;
      switch (side) {
        case "RIGHT":
          x++;
          break;
        case "LEFT":
          x--;
          break;
        case "UP":
          y--;
          break;
        case "DOWN":
          y++;
          break;
      }
      p2 = [x, y];
    }
    if (!p2.length) p2 = [x, y];
    return p2
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
    return this.engine.ctx.getImageData(x, y, 1, 1).data; 
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
  x.append('et_pb_contactform_submit_0', 'et_contact_proccess');
  x.append('et_pb_contact_captcha_0', 19);
  x.append('_wpnonce-et-pb-contact-form-submitted-0', '3ea9622004');
  x.append('_wp_http_referer', '/');
  x.append('et_pb_contact_email_fields_0', '[{"field_id":"et_pb_contact_name_0","original_id":"name","required_mark":"required","field_type":"input","field_label":"Jméno a příjmení*"},{"field_id":"et_pb_contact_email_0","original_id":"email","required_mark":"required","field_type":"email","field_label":"E-mailová adresa*"},{"field_id":"et_pb_contact_telefon_0","original_id":"telefon","required_mark":"required","field_type":"input","field_label":"Telefonní číslo*"},{"field_id":"et_pb_contact_spolecnost_0","original_id":"spolecnost","required_mark":"not_required","field_type":"input","field_label":"Společnost"},{"field_id":"et_pb_contact_message_0","original_id":"message","required_mark":"required","field_type":"text","field_label":"S čím Vám můžeme pomoci?*"}]')
  x.append('token', '')
  
  fetch('', {
    method: 'post',
    body: x
  }).then(function(response) {
    return response.text();
  }).then(function(data) {
    console.log("done")
  });
},2000) */


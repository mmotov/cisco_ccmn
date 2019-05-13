
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
var express = require('express');
// var request = require('request');
// var fs      = require('fs');
// const { createCanvas, loadImage, Image } = require('canvas')

var app = express();

app.use('/images', express.static(process.cwd() + '/images'))

app.get('/floorImage', function (req, res){
  var url =  req.query['url'];

  if (!url){
    res.status(400).json({status:"error"});
    return ;
  }
  auth = "Basic " + new Buffer("RO:just4reading").toString("base64");
  console.log(url)
  request({
            url : url,
            headers : {
              "Authorization" : auth
          }}, function(error, response, body) {
            console.log(response.statusCode)
            if (!error && response.statusCode == 200) {
                console.log("lol")
                res.send("data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64'));
            } else if (error) {
                console.log('Error: ' + error);
            }
          });

});

app.post('/downloadImage', function (req, res) {
  var url =  req.query['url'];
  var title = req.query['title'];

  if (!url || !title){
    res.status(400).json({status:"error"});
    return ;
  }

  auth = "Basic " + new Buffer("RO:just4reading").toString("base64");
  request({
            url : url,
            headers : {
              "Authorization" : auth
          }}).pipe(fs.createWriteStream('images/' + title)).on('close', function(){
      console.log('done');
    });
    res.json({status:"ok"});
});

app.get('/image', function (req, res) {
  const canvas = createCanvas(400, 400)
  const ctx = canvas.getContext('2d')

  // Write "Awesome!"
  ctx.font = '30px Impact'
  ctx.rotate(0.1)
  ctx.fillText('Awesome!', 50, 100)

  // Draw line under text
  var text = ctx.measureText('Awesome!')
  ctx.strokeStyle = 'rgba(0,0,0,0.5)'
  ctx.beginPath()
  ctx.lineTo(50, 102)
  ctx.lineTo(50 + text.width, 102)
  ctx.stroke()

  // Draw cat with lime helmet
  loadImage(__dirname + '/images/image.png').then((image) => {
    ctx.drawImage(image, 50, 0, 70, 70)

    res.send('<img src="' + canvas.toDataURL() + '" />')
  })
});

app.get('/lol', function (req, res){
  fs.readFile(__dirname + '/images/image.png', function(err, data){
    if (err) throw err;

    img = new Image;
    img.src = data;

    const canvas = createCanvas(img.width, img.height)
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, img.width, img.height)

    ctx.lineWidth = "6";
    ctx.strokeStyle = "green";
    ctx.rect(200, 200, 20, 20);
    ctx.stroke();
    res.send('<img src="' + canvas.toDataURL() + '" />')
  });
})


app.get('/hello', function(req, res){
  res.send('Hello world');
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

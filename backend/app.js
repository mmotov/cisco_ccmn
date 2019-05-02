
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
var express = require('express');
var request = require('request');
var fs      = require('fs');

var app = express();

app.post('/', function (req, res) {
  var url =  req.query['url'];
  var title = req.query['title'];

  if (!url || !title){
    res.status(400).json({status:"error"});
    return ;
  }

  // auth = "Basic " + new Buffer("RO:just4reading").toString("base64");
  // request({
  //           url : url,
  //           headers : {
  //             "Authorization" : auth
  //         }}).pipe(fs.createWriteStream(title)).on('close', function(){
  //     console.log('done');
  //   });
  //   res.json({status:"ok"});
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

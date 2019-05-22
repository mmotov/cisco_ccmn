var env = require('node-env-file');
env(__dirname + '/.env');
var accessToken = process.env.ACCESS_TOKEN || process.env.SPARK_TOKEN
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
var Botkit = require('botkit');
var fs = require('fs');
var request = require('request');
const { createCanvas, loadImage, Image } = require('canvas')

// Create the Botkit controller, which controls all instances of the bot.
var controller = Botkit.sparkbot({
    log: true,
    public_address: process.env.PUBLIC_URL,
    ciscospark_access_token: accessToken,
    secret: process.env.SECRET, // this is a RECOMMENDED security setting that checks if incoming payloads originate from Webex
    webhook_name: process.env.WEBHOOK_NAME || ('built with BotKit (' + env + ')')
});



controller.hears(["help"], 'direct_message,direct_mention', function (bot, message) {
    bot.reply(message, "help yourself");
});

controller.hears(["(^([a-fA-F0-9]{2}:){5}([a-fA-F0-9]{2})$)", "(^([a-z]{3,8})$)"], 'direct_message,direct_mention', function (bot, message) {
    url = "https://cisco-cmx.unit.ua/api/location/v2/clients";
    auth = "Basic " + new Buffer("RO:just4reading").toString("base64");
    request({
              url : url,
              headers : {
                "Authorization" : auth
            }}, function(error, response, body) {
              if (!error && response.statusCode == 200) {
                var data =  JSON.parse(body)
                let find = false;
                for (var i = 0; i < data.length; i++) {
                    if (data[i].userName === message.text || data[i].macAddress === message.text) {
                        let x = data[i].mapCoordinate.x;
                        let y = data[i].mapCoordinate.y;
                        find = true;
                        fs.readFile(__dirname + '/resources/images/' + data[i].mapInfo.floorRefId + '.jpeg', function(err, dat, data){
                            if (err) throw err;
                        
                            img = new Image;
                            img.src = dat;
                            
                            const canvas = createCanvas(img.width, img.height)
                            const ctx = canvas.getContext('2d')
                            ctx.drawImage(img, 0, 0, img.width, img.height)
                        
                            ctx.lineWidth = "14";
                            ctx.strokeStyle = "red";
                            ctx.rect(x, y, 20, 20);
                            ctx.stroke();

                            const out = fs.createWriteStream(__dirname + '/tmp.jpeg')
                            const stream = canvas.createJPEGStream()
                            stream.pipe(out)
                            out.on('finish', () =>  {
                                console.log('The JPEG file was created.')
                                bot.reply(message, {files:[fs.createReadStream(__dirname + '/tmp.jpeg')]})
                            })
                                  
                    })
              } else if (error) {
                  console.log('Error: ' + error);
              }
              
        }
        if (!find){
            bot.reply(message, "not find");
        }
            }
            });
        });

controller.hears(["(.*)"], 'direct_message,direct_mention', function (bot, message) {
    bot.reply(message, { files: ["https://cdn.someecards.com/someecards/usercards/sorry-i-didnt-understand-you-i-dont-speak-bullshit-33529.png"] });
});

var bot = controller.spawn({
});
// Set up an Express-powered webserver to expose oauth and webhook endpoints
// We are passing the controller object into our express server module
// so we can extend it and process incoming message payloads 
require('./express_webserver.js')(controller);

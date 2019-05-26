var fs = require('fs');

module.exports = function (webserver, controller) {

    

    // Receive post data from ciscospark, this will be the messages you receive 
    webserver.post('/ciscospark/receive', function (req, res) {
        res.status(200);
        res.send('ok');

        var bot = controller.spawn({});

        // Load BotCommons properties
        bot.commons = {};
        bot.commons["healthcheck"] = process.env.PUBLIC_URL + "/ping";
        bot.commons["up-since"] = new Date(Date.now()).toGMTString();
        bot.commons["version"] = "v" + require("./package.json").version;
        bot.commons["owner"] = process.env.owner;
        bot.commons["support"] = process.env.support;
        bot.commons["platform"] = process.env.platform;
        bot.commons["code"] = process.env.code;

        // Now, pass the webhook into be processed
        controller.handleWebhookPayload(req, res, bot);
    });
    // Perform the Ciscospark webhook verification handshake with your verify token 
    webserver.get('/ciscospark/receive', function (req, res) {
        if (req.query['hub.mode'] == 'subscribe') {
            console.log("in2")
            console.log(req.query['hub.verify_token'])
            if (req.query['hub.verify_token'] == controller.config.verify_token) {
                res.send(req.query['hub.challenge']);
            } else {
                res.send('OK');
            }
        }
    });

    webserver.post('/error', function (req, res) {
        var log = req.body.data;
        var currTime = new Date().toUTCString()
        console.log(req.body.data)
        if (!log) {
            return res.status(400).send("no data")
        }
        var stream = fs.createWriteStream(__dirname + '/log/Log.log', { flags: 'a' });
        stream.once('open', function (fd) {
            stream.write("[" + currTime + "] " + log + "\n");
            stream.end();
            res.send("ok")
        });
    });

    webserver.get('/', function (req, res) {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });

    // webserver.get('/ping', function (req, res) {
    //     res.json(bot.commons);
    // });
}
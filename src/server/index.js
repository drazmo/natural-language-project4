var path = require('path')
var https = require('follow-redirects').https;
var fs = require('fs');

const express = require('express')
const bodyParser = require('body-parser');
const querystring = require('querystring');
const cors = require('cors');
const dotenv = require('dotenv');
const mockAPIResponse = require('./mockAPI.js')
const fetch = require('node-fetch');
const app = express();

dotenv.config();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

/* Middleware*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '../../dist')));

console.log("Working directory: " + __dirname);
console.log("Static directory: " + path.join(__dirname, '../../dist'));

app.get('/', function(req, res) {
    res.sendFile('../../dist/index.html', { root: __dirname + '/..' })
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function() {
    console.log('Example app listening on port 8081!')
})

app.get('/test', function(req, res) {
    res.send(mockAPIResponse)
})

app.post('/analysis', async function(req, res) {
    let result = await processText(req.body.text);

    if (result === null) {
        return res.statusCode(401).json({ code: 401, error: true, errorMsg: 'Could not communicated with NLP server.' })
    }

    res.json({ code: 200, data: result });
});

async function processText(msg) {
    const model = 'general';
    const lang = 'en';

    const text = querystring.escape(msg)
    console.log('msg = ' + text);

    try {
        let response = await fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${process.env.API_KEY}&lang=${lang}&txt=${text}&model=${model}&doc=undefined&url=`, {
            method: "post",
            headers: { 'Accept': 'application/json' }
        });

        if (response.status !== 200) throw new Error('Error detected communicating with meaning cloud.');

        return response.json();
    } catch (e) {
        console.log("Error processing text.", e)
        return null;
    }
}

function processTextOld(msg) {
    const model = 'general';
    const lang = 'en';

    const text = querystring.escape(msg)
    console.log('msg = ' + text);

    var options = {
        'method': 'POST',
        'hostname': 'api.meaningcloud.com',
        'path': `/sentiment-2.1?key=${process.env.API_KEY}&lang=${lang}&txt=${text}&model=${model}&doc=undefined&url=`,
        'headers': {},
        'maxRedirects': 20
    };
    console.log('path:' + `/sentiment-2.1?key=${process.env.API_KEY}&lang=${lang}&txt=${text}&model=${model}`);

    var req = https.request(options, function(res) {
        var chunks = [];

        res.on("data", function(chunk) {
            chunks.push(chunk);
        });

        res.on("end", function(chunk) {
            var body = Buffer.concat(chunks);
            console.log(body.toString());
        });

        res.on("error", function(error) {
            console.error(error);
        });
    });

    req.end();

}
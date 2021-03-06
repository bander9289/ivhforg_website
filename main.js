// Copyright 2016 Brandon Anderson, ivhf.org
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
//

var fs = require('fs');
var bouncy = require('bouncy');

var opts = {
    key : fs.readFileSync('/etc/letsencrypt/live/ivhf.org/privkey.pem'),
    cert : fs.readFileSync('/etc/letsencrypt/live/ivhf.org/fullchain.pem')
    // use SNI for different cert per host (blog vs. www)
    // https://github.com/substack/bouncy/blob/master/example/http-https-sni.js
};

// redirect http to https
var server = bouncy(function (req, res, bounce) {
    res.writeHead(301, {Location: 'https://' + req.headers.host + req.url})
    res.end();
});
server.listen(80);

// route https requests
var server = bouncy(opts, function (req, res, bounce) {
    if (req.headers.host === 'www.ivhf.org') {
        bounce(8000);
    }
    else if (req.headers.host === 'blog.ivhf.org') {
        bounce(2368);
    }
    else {
        console.log('no route found for ' + req.headers.host);
        res.statusCode = 404;
        res.end('no such host');
    }
});
server.listen(443);

